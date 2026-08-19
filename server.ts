import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';

// Profile Photo Persistent Storage Config
const UPLOADS_DIR = path.join(process.cwd(), 'uploads', 'profile');
const MANIFEST_PATH = path.join(UPLOADS_DIR, 'manifest.json');
const DEFAULT_PHOTO_PATH = '/src/assets/images/ariti_actual_white_suit_studio_1786201703704.jpg';

interface ProfilePhotoManifest {
  activeFilename: string | null;
  originalName: string | null;
  mimeType: string | null;
  updatedAt: number;
}

function ensureUploadsDirectory() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

function readManifest(): ProfilePhotoManifest {
  try {
    ensureUploadsDirectory();

    // 1. Check if manifest.json exists and points to a valid file
    if (fs.existsSync(MANIFEST_PATH)) {
      const data = fs.readFileSync(MANIFEST_PATH, 'utf-8');
      const parsed = JSON.parse(data);
      if (parsed && parsed.activeFilename) {
        const activePath = path.join(UPLOADS_DIR, parsed.activeFilename);
        if (fs.existsSync(activePath) && fs.statSync(activePath).size > 0) {
          return parsed;
        }
      }
      // If manifest explicitly records activeFilename: null and no files on disk, return it
      if (parsed && parsed.activeFilename === null) {
        return parsed;
      }
    }

    // 2. Self-Healing Auto-Recovery: Scan directory for any uploaded custom image files
    if (fs.existsSync(UPLOADS_DIR)) {
      const files = fs.readdirSync(UPLOADS_DIR)
        .filter(f => f.startsWith('profile_') && !f.endsWith('.json'))
        .filter(f => {
          try {
            return fs.statSync(path.join(UPLOADS_DIR, f)).size > 0;
          } catch {
            return false;
          }
        })
        .map(f => {
          const stats = fs.statSync(path.join(UPLOADS_DIR, f));
          return {
            filename: f,
            mtime: stats.mtimeMs,
            size: stats.size,
          };
        })
        .sort((a, b) => b.mtime - a.mtime);

      if (files.length > 0) {
        const latest = files[0];
        const ext = path.extname(latest.filename).toLowerCase();
        const mimeMap: Record<string, string> = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.webp': 'image/webp',
          '.gif': 'image/gif',
        };
        const recoveredManifest: ProfilePhotoManifest = {
          activeFilename: latest.filename,
          originalName: 'custom_profile_photo',
          mimeType: mimeMap[ext] || 'image/jpeg',
          updatedAt: Math.floor(latest.mtime) || Date.now(),
        };
        writeManifest(recoveredManifest);
        console.log(`[PROFILE PHOTO AUTO-RECOVERY] Synced active profile photo from disk: ${latest.filename}`);
        return recoveredManifest;
      }
    }
  } catch (err) {
    console.error('[PROFILE PHOTO MANIFEST READ ERROR]', err);
  }

  return {
    activeFilename: null,
    originalName: null,
    mimeType: null,
    updatedAt: 0,
  };
}

function writeManifest(manifest: ProfilePhotoManifest) {
  ensureUploadsDirectory();
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set json limit to 10mb for image uploads
  app.use(express.json({ limit: '10mb' }));

  // Security Headers Middleware
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // In-memory rate limiting map for contact form (max 5 requests per 15 minutes per IP)
  const ipRateLimitMap = new Map<string, { count: number; resetTime: number }>();

  // API Routes
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      developer: 'Ariti Temesgen Wayu',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // Profile Photo API Routes (Single Source of Truth)
  app.get('/api/profile-photo/active', (_req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    const manifest = readManifest();
    if (manifest.activeFilename) {
      const filePath = path.join(UPLOADS_DIR, manifest.activeFilename);
      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
        res.json({
          success: true,
          url: `/api/profile-photo/image?t=${manifest.updatedAt}`,
          isCustom: true,
          updatedAt: manifest.updatedAt
        });
        return;
      }
    }
    res.json({
      success: true,
      url: `/api/profile-photo/image?default=1`,
      isCustom: false,
      updatedAt: 0
    });
  });

  app.get('/api/profile-photo/image', (req: Request, res: Response) => {
    const isExplicitDefault = req.query.default === '1';
    const manifest = readManifest();

    if (!isExplicitDefault && manifest.activeFilename) {
      const filePath = path.join(UPLOADS_DIR, manifest.activeFilename);
      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
        res.setHeader('Content-Type', manifest.mimeType || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400, must-revalidate');
        res.sendFile(filePath);
        return;
      }
    }

    const defaultDiskPath = path.join(process.cwd(), 'src/assets/images/ariti_actual_white_suit_studio_1786201703704.jpg');
    if (fs.existsSync(defaultDiskPath)) {
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400, must-revalidate');
      res.sendFile(defaultDiskPath);
    } else {
      res.redirect(DEFAULT_PHOTO_PATH);
    }
  });

  app.post('/api/profile-photo', (req: Request, res: Response) => {
    try {
      const { imageBase64, mimeType, fileName } = req.body || {};

      if (!imageBase64 || typeof imageBase64 !== 'string') {
        res.status(400).json({ error: 'Image content is required for profile photo upload.' });
        return;
      }

      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      const cleanMimeType = (mimeType || 'image/jpeg').toLowerCase().trim();

      if (!allowedMimeTypes.includes(cleanMimeType)) {
        res.status(400).json({ error: 'Unsupported image format. Allowed formats: JPEG, PNG, WebP, GIF.' });
        return;
      }

      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
      if (buffer.length === 0 || buffer.length > MAX_SIZE) {
        res.status(400).json({
          error: `Image file size must be between 1 KB and 5 MB. Provided size: ${(buffer.length / 1024 / 1024).toFixed(2)} MB.`
        });
        return;
      }

      ensureUploadsDirectory();

      const extMap: Record<string, string> = {
        'image/jpeg': '.jpg',
        'image/jpg': '.jpg',
        'image/png': '.png',
        'image/webp': '.webp',
        'image/gif': '.gif'
      };
      const ext = extMap[cleanMimeType] || '.jpg';
      const timestamp = Date.now();
      const newFilename = `profile_${timestamp}_${Math.random().toString(36).substring(2, 8)}${ext}`;
      const newFilePath = path.join(UPLOADS_DIR, newFilename);

      // STEP 1: Write new asset to disk FIRST (Failure Safety)
      fs.writeFileSync(newFilePath, buffer);

      if (!fs.existsSync(newFilePath) || fs.statSync(newFilePath).size === 0) {
        res.status(500).json({ error: 'Failed to write new profile image to persistent storage.' });
        return;
      }

      // STEP 2: Clean up previous custom profile photo files in UPLOADS_DIR
      try {
        const existingFiles = fs.readdirSync(UPLOADS_DIR);
        for (const file of existingFiles) {
          if (file.startsWith('profile_') && file !== newFilename && !file.endsWith('.json')) {
            try {
              fs.unlinkSync(path.join(UPLOADS_DIR, file));
              console.log(`[PERSISTENT STORAGE] Removed previous profile photo asset: ${file}`);
            } catch (unlinkErr) {
              console.warn(`[PERSISTENT STORAGE CLEANUP WARNING] Could not remove ${file}:`, unlinkErr);
            }
          }
        }
      } catch (scanErr) {
        console.warn('[PERSISTENT STORAGE SCAN WARNING]', scanErr);
      }

      // STEP 3: Update manifest record to point EXCLUSIVELY to new asset
      const newManifest: ProfilePhotoManifest = {
        activeFilename: newFilename,
        originalName: fileName ? String(fileName).slice(0, 100) : 'uploaded_photo',
        mimeType: cleanMimeType,
        updatedAt: timestamp
      };
      writeManifest(newManifest);

      console.log(`[PROFILE PHOTO SAVED] Active asset: ${newFilename}`);

      res.status(200).json({
        success: true,
        message: 'Profile photo successfully replaced.',
        url: `/api/profile-photo/image?t=${timestamp}`,
        isCustom: true,
        updatedAt: timestamp
      });
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : String(err);
      console.error('[PROFILE PHOTO UPLOAD EXCEPTION]', errMessage);
      res.status(500).json({ error: 'Internal server error processing profile photo replacement.' });
    }
  });

  app.delete('/api/profile-photo', (_req: Request, res: Response) => {
    try {
      ensureUploadsDirectory();
      try {
        const existingFiles = fs.readdirSync(UPLOADS_DIR);
        for (const file of existingFiles) {
          if (file.startsWith('profile_') && !file.endsWith('.json')) {
            try {
              fs.unlinkSync(path.join(UPLOADS_DIR, file));
              console.log(`[PERSISTENT STORAGE] Deleted custom profile photo asset: ${file}`);
            } catch (unlinkErr) {
              console.warn('[PERSISTENT STORAGE WARNING] Could not delete custom file:', unlinkErr);
            }
          }
        }
      } catch (scanErr) {
        console.warn('[PERSISTENT STORAGE SCAN WARNING]', scanErr);
      }

      const timestamp = Date.now();
      writeManifest({
        activeFilename: null,
        originalName: null,
        mimeType: null,
        updatedAt: timestamp
      });

      res.status(200).json({
        success: true,
        message: 'Profile photo reset to default.',
        url: `/api/profile-photo/image?default=1&t=${timestamp}`,
        isCustom: false,
        updatedAt: timestamp
      });
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : String(err);
      console.error('[PROFILE PHOTO DELETE EXCEPTION]', errMessage);
      res.status(500).json({ error: 'Failed to reset profile photo.' });
    }
  });

  // Contact Form Submission Endpoint with Resend Email Integration
  app.post('/api/contact', async (req: Request, res: Response) => {
    const clientIp = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const ipKey = String(clientIp);
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes

    // Check rate limit
    const rateData = ipRateLimitMap.get(ipKey);
    if (rateData && now < rateData.resetTime) {
      if (rateData.count >= 5) {
        res.status(429).json({ error: 'Too many contact requests from this IP. Please try again in 15 minutes.' });
        return;
      }
      rateData.count += 1;
    } else {
      ipRateLimitMap.set(ipKey, { count: 1, resetTime: now + windowMs });
    }

    const { name, email, company, serviceType, budget, timeline, message, additionalInfo, honeypot } = req.body || {};

    // Anti-spam Honeypot Check
    if (honeypot) {
      // Quietly accept to confuse bots without logging lead
      res.status(200).json({ success: true, message: 'Message sent successfully.' });
      return;
    }

    // Input Sanitization and Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      res.status(400).json({ error: 'Please provide a valid name between 2 and 100 characters.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim()) || email.length > 150) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 2000) {
      res.status(400).json({ error: 'Please enter a message between 10 and 2000 characters.' });
      return;
    }

    const leadRecord = {
      id: `lead_${Date.now()}`,
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 150),
      company: company && String(company).trim() ? String(company).trim().slice(0, 150) : 'N/A',
      serviceType: serviceType && String(serviceType).trim() ? String(serviceType).trim().slice(0, 100) : 'General Inquiry',
      budget: budget && String(budget).trim() ? String(budget).trim().slice(0, 100) : 'Flexible',
      timeline: timeline && String(timeline).trim() ? String(timeline).trim().slice(0, 100) : 'Flexible',
      message: message.trim().slice(0, 2000),
      additionalInfo: additionalInfo && String(additionalInfo).trim() ? String(additionalInfo).trim().slice(0, 1000) : 'None provided',
      receivedAt: new Date().toISOString()
    };

    console.log('[LEAD RECORD CREATED]', JSON.stringify(leadRecord, null, 2));

    const emailBodyText = `NEW PROJECT INQUIRY

Name: ${leadRecord.name}
Email: ${leadRecord.email}
Company: ${leadRecord.company}
Project type: ${leadRecord.serviceType}
Budget: ${leadRecord.budget}
Timeline: ${leadRecord.timeline}

Project description:
${leadRecord.message}

Additional information:
${leadRecord.additionalInfo}`;

    const isProduction = process.env.NODE_ENV === 'production';
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactDestination = process.env.CONTACT_EMAIL;

    // Strict production security check: require RESEND_API_KEY and CONTACT_EMAIL
    if (isProduction && (!resendApiKey || !contactDestination)) {
      console.error('[PRODUCTION CONFIG ERROR] Required environment variables (RESEND_API_KEY, CONTACT_EMAIL) are not configured.');
      res.status(500).json({
        error: 'Unable to deliver message at this time. Please try again later or contact me directly.'
      });
      return;
    }

    const recipientEmail = contactDestination || 'arititemesgen16@gmail.com';

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const { data, error } = await resend.emails.send({
          from: 'Portfolio Inquiries <onboarding@resend.dev>',
          to: [recipientEmail],
          replyTo: leadRecord.email,
          subject: `NEW PROJECT INQUIRY: ${leadRecord.serviceType} from ${leadRecord.name}`,
          text: emailBodyText,
        });

        if (error) {
          console.error('[EMAIL DELIVERY ERROR]', error);
          res.status(500).json({
            error: 'Unable to deliver message at this time. Please try again later or contact me directly.'
          });
          return;
        }

        console.log('[EMAIL DELIVERED VIA RESEND]', data);
      } catch (err: unknown) {
        const errMessage = err instanceof Error ? err.message : String(err);
        console.error('[EMAIL EXCEPTION]', errMessage);
        res.status(500).json({
          error: 'Unable to deliver message at this time. Please try again later or contact me directly.'
        });
        return;
      }
    } else {
      // Safe development mode fallback when no API key is provided
      console.log('[DEV MODE: NO RESEND_API_KEY CONFIGURED]');
      console.log(`[DEV SIMULATED EMAIL TO ${recipientEmail}]:\n${emailBodyText}`);
    }

    res.status(200).json({
      success: true,
      message: `Thank you ${leadRecord.name}. Your message has been sent successfully! Ariti will reply to ${leadRecord.email} within 24 hours.`,
      referenceId: leadRecord.id
    });
  });

  // Dynamic Sitemap XML for SEO
  app.get('/sitemap.xml', (_req: Request, res: Response) => {
    const baseUrl = process.env.APP_URL || 'https://arititemesgen.dev';
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/projects</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/projects/smartspend</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/projects/agriconnect-ethiopia</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/projects/pharmacore-ethiopia</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  // Robots.txt for Search Engines
  app.get('/robots.txt', (_req: Request, res: Response) => {
    const baseUrl = process.env.APP_URL || 'https://arititemesgen.dev';
    const robots = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`;
    res.header('Content-Type', 'text/plain');
    res.send(robots);
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
