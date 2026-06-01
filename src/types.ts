export interface Game {
  id: string;
  title: string;
  developer: string;
  tag: string;
  icon: string;
  status: 'Ready to Play' | 'Installed' | 'Update Available' | 'Claimable Subsidized' | 'Locked';
  releaseYear: string;
  size: string;
  description: string;
}

export interface MutualAidGrant {
  id: string;
  gameTitle: string;
  timeAgo: string;
}

export interface ChestStats {
  treasuryPool: string;
  assistanceThreshold: string;
  disbursedSubsidies: number;
  recentGrants: MutualAidGrant[];
}

export interface ConsoleMessage {
  id: string;
  timestamp: string;
  type: 'input' | 'system' | 'response' | 'error' | 'success';
  content: string;
}
