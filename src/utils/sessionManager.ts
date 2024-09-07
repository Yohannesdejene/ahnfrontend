import { jwtDecode } from "jwt-decode";

const session_key_name = "JVAy2";
const temp_key_name = "Tempt";

const permissions_key_name = "yfvhW";

interface SetSessionKeyParams {
  userToken: string;
}

export function setSessionKey({ userToken }: SetSessionKeyParams): boolean {
  try {
    if (userToken) {
      const hashed_token = btoa(userToken);

      const jwt: { exp: number } = jwtDecode(userToken); // Define the structure of the decoded JWT
      const expiry = jwt.exp;
      if (Date.now() >= expiry * 1000) {
        return false;
      }

      localStorage.setItem(session_key_name, hashed_token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
export function setTemporaryToken({ userToken }: SetSessionKeyParams): boolean {
  try {
    if (userToken) {
      const hashed_token = btoa(userToken);

      const jwt: { exp: number } = jwtDecode(userToken); // Define the structure of the decoded JWT
      const expiry = jwt.exp;
      if (Date.now() >= expiry * 1000) {
        return false;
      }

      localStorage.setItem(temp_key_name, hashed_token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export function verifyPermission(permission: string): boolean {
  try {
    const perms = JSON.parse(
      localStorage.getItem(permissions_key_name) || "[]",
    );
    return perms.includes(permission);
  } catch (e) {
    return false;
  }
}

export function getPermissionsKey(): string[] | null {
  try {
    const decoded_perms = atob(
      localStorage.getItem(permissions_key_name) || "",
    );
    const perms = JSON.parse(decoded_perms);
    return [...perms];
  } catch (e) {
    return null;
  }
}

export function getSessionKey(): string | null | undefined {
  try {
    const session_key = localStorage.getItem(session_key_name);
    if (session_key) {
      const plain_session_key = atob(session_key);
      return plain_session_key;
    }
  } catch (e) {
    return null;
  }
}

export function getTemporaryToken(): string | null | undefined {
  try {
    const session_key = localStorage.getItem(temp_key_name);
    if (session_key) {
      const plain_session_key = atob(session_key);
      return plain_session_key;
    }
  } catch (e) {
    return null;
  }
}
export function deleteTempSession(): void {
  localStorage.remove(temp_key_name);
}


export function deleteSessionKeys(): void {
  localStorage.clear();
}

export function getUserDetails(): string | null | undefined {
  try {
    const session_key = getSessionKey();
    if (session_key) {
      const decoded: { sub: string } = jwtDecode(session_key); // Use jwtDecode directly
      return decoded.sub;
    }
  } catch (error) {
    return null;
  }
}
