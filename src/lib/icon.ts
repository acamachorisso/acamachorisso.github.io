import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { getSite } from './content';

/**
 * Ícono de la pestaña y del celular, armado con el logo de Datos generales sobre fondo negro.
 * Si Agustín cambia el logo, el ícono cambia solo.
 */
export async function iconPng(size: number): Promise<Response> {
  const site = await getSite();
  const logo = await sharp(readFileSync(join(process.cwd(), site.logo)))
    .trim()
    .resize({ width: Math.round(size * 0.78), height: Math.round(size * 0.78), fit: 'inside' })
    .toBuffer();
  const png = await sharp({ create: { width: size, height: size, channels: 4, background: '#0a0a0a' } })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
