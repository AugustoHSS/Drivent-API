import { RedisClientType } from "@redis/client";
import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

export let redis: RedisClientType;
export async function connectRedis(): Promise<void> {
  const url = process.env.REDIS_URL;

  redis = createClient({ url });

  await redis.connect();
}

export async function disconnectRedis(): Promise<void> {
  await redis?.disconnect();
}
