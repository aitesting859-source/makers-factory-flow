import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const port = Number(process.env.BACKEND_PORT || 4000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");
const publicDir = path.join(__dirname, "public");
const servicesPath = path.join(dataDir, "services.json");
const inquiriesPath = path.join(dataDir, "inquiries.json");
const mediaPath = path.join(dataDir, "media.json");
const mediaUsagePath = path.join(dataDir, "media-usage.json");

const readJsonFile = async (filePath, fallback = []) => {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") {
      return fallback;
    }
    throw error;
  }
};

const parseRequestBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];

    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      if (chunks.length === 0) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(new Error("Invalid JSON payload."));
      }
    });
    req.on("error", reject);
  });

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(payload));
};

const sendHtml = async (res, filePath) => {
  const html = await fs.readFile(filePath, "utf8");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
};

const saveInquiry = async (inquiry) => {
  const inquiries = await readJsonFile(inquiriesPath, []);
  inquiries.push(inquiry);
  await fs.writeFile(inquiriesPath, JSON.stringify(inquiries, null, 2));
};

const saveMedia = async (media) => {
  await fs.writeFile(mediaPath, JSON.stringify(media, null, 2));
};

const server = createServer(async (req, res) => {
  const requestUrl = new URL(req.url || "", `http://${req.headers.host}`);

  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  try {
    if (req.method === "GET" && requestUrl.pathname === "/") {
      sendHtml(res, path.join(publicDir, "admin.html"));
      return;
    }

    if (req.method === "GET" && requestUrl.pathname === "/admin") {
      sendHtml(res, path.join(publicDir, "admin.html"));
      return;
    }

    if (req.method === "GET" && requestUrl.pathname === "/api/health") {
      sendJson(res, 200, {
        status: "ok",
        service: "makers-factory-flow-backend",
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (req.method === "GET" && requestUrl.pathname === "/api/media") {
      const media = await readJsonFile(mediaPath, {});
      sendJson(res, 200, { media });
      return;
    }

    if (req.method === "PUT" && requestUrl.pathname === "/api/media") {
      const { media } = await parseRequestBody(req);

      if (!media || typeof media !== "object" || Array.isArray(media)) {
        sendJson(res, 400, { error: "media must be a valid JSON object." });
        return;
      }

      await saveMedia(media);
      sendJson(res, 200, { message: "Media configuration saved.", media });
      return;
    }

    if (req.method === "GET" && requestUrl.pathname === "/api/media/usage") {
      const usage = await readJsonFile(mediaUsagePath, []);
      sendJson(res, 200, usage);
      return;
    }

    if (req.method === "GET" && requestUrl.pathname === "/api/services") {
      const services = await readJsonFile(servicesPath, []);
      sendJson(res, 200, { services });
      return;
    }

    if (req.method === "GET" && requestUrl.pathname === "/api/inquiries") {
      const inquiries = await readJsonFile(inquiriesPath, []);
      sendJson(res, 200, { inquiries });
      return;
    }

    if (req.method === "POST" && requestUrl.pathname === "/api/inquiries") {
      const { name, email, message, serviceId } = await parseRequestBody(req);

      if (!name || !email || !message) {
        sendJson(res, 400, {
          error: "name, email, and message are required fields.",
        });
        return;
      }

      const inquiry = {
        id: randomUUID(),
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        serviceId: serviceId ? String(serviceId).trim() : null,
        message: String(message).trim(),
        submittedAt: new Date().toISOString(),
      };

      await saveInquiry(inquiry);
      sendJson(res, 201, {
        message: "Inquiry received successfully.",
        inquiry,
      });
      return;
    }

    sendJson(res, 404, { error: "Route not found." });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: error.message || "Server error." });
  }
});

server.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
