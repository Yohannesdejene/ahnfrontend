// Role type for the GET API response
export type ROLE = {
  id: number;
  name: string;
  description: string;
  code: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  Permissions: {
    id: number;
    name: string;
  }[]; // Array of permissions
};

// Payload for creating a role
export interface CREATE_ROLE {
  name: string;
  description: string;
  permissionIds: number[]; // Array of permission IDs
}

// Payload for updating a role
export interface UPDATE_ROLE {
  name: string;
  description: string;
  permissionIds: number[]; // Array of permission IDs
}
