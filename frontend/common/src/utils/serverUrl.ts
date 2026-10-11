import type { ClientConfig } from '../models/clientConfig';

type ServerLocation = Pick<ClientConfig, 'host' | 'port'>;

function browserProtocol(): string {
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    return 'https:';
  }
  return 'http:';
}

function formatHost(host: string): string {
  if (host.includes(':') && !host.startsWith('[')) {
    return `[${host}]`;
  }
  return host;
}

function formatPath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export function buildApiUrl(path: string, config: ServerLocation): string {
  return `${browserProtocol()}//${formatHost(config.host)}:${config.port}${formatPath(path)}`;
}

export function buildWebSocketUrl(path: string, config: ServerLocation): string {
  const protocol = browserProtocol() === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${formatHost(config.host)}:${config.port}${formatPath(path)}`;
}
