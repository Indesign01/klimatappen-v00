export interface ClimateGroup {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    category: string;
    isJoined: boolean;
  }

  export interface GroupMember {
    id: string;
    name: string;
    joinedAt: Date;
    role: 'member' | 'admin';
  }

  export interface Discussion {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    replies: Reply[];
  }

  export interface Reply {
    id: string;
    content: string;
    author: string;
    createdAt: Date;
  }