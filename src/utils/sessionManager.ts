import { jwtDecode } from "jwt-decode";

const session_key_name = "JVAy2";
const session_user = "UKA5W3";
const temp_token_key = "tem-token_key";
const temp_key_email = "temp-email";

const language_key = "lang";

const permissions_key_name = "yfvhW";

interface SET_SESSION_TOKEN {
  userToken: string;
}
interface SET_TEMP_EMAIL {
  email: string;
}
interface USER_TYPE {
  user: {
    id: string;
    group_id: number;
    username: string;
    is_active: Boolean;
    last_login: string | null;
    is_super_user: Boolean;
    date_joined: string;
    login_from: string | null;
    profile_picture: string;
    created_date: string;
    updated_date: string;
  };
}
interface PERMISSION_TYPE {
  permission: string[] | null;
}

export function setSessionKey({ userToken }: SET_SESSION_TOKEN): boolean {
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

export function setUserInfo(user: USER_TYPE): boolean {
  try {
    if (user) {
      const userString = JSON.stringify(user);
      const hashed_token = btoa(userString);
      localStorage.setItem(session_user, hashed_token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export function setEmailInfo(email: SET_TEMP_EMAIL): boolean {
  try {
    if (email) {
      const userString = JSON.stringify(email);
      const hashed_token = btoa(userString);
      localStorage.setItem(temp_key_email, hashed_token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
export function getEmailInfo(): string | null | undefined {
  try {
    const session_key = localStorage.getItem(temp_key_email);
    if (session_key) {
      const plain_session_key = atob(session_key);
      const plain_user = JSON.parse(plain_session_key);
      return plain_user;
    }
  } catch (e) {
    return null;
  }
}
export function deleteTempEmailSession(): void {
  console.log("12345678990");
  if (typeof window !== "undefined") {
    localStorage.removeItem(temp_key_email);
  }
  // localStorage.remove(temp_key_email);
}

export function getUserInfo(): string | null | undefined {
  try {
    const session_key = localStorage.getItem(session_user);
    if (session_key) {
      const plain_session_key = atob(session_key);
      const plain_user = JSON.parse(plain_session_key);
      return plain_user;
    }
  } catch (e) {
    return null;
  }
}

export function setPermissionInfo(permission: PERMISSION_TYPE): boolean {
  try {
    if (permission) {
      const userString = JSON.stringify(permission);
      const hashed_token = btoa(userString);
      localStorage.setItem(permissions_key_name, hashed_token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
export function getPermissionInfo(): string[] | null | undefined {
  try {
    // const session_key = localStorage.getItem(permissions_key_name);
    const session_key = JSON.parse(
      localStorage.getItem(permissions_key_name) || "[]",
    );
    if (session_key) {
      const plain_session_key = atob(session_key);
      const plain_user = JSON.parse(plain_session_key);
      return plain_user;
    }
  } catch (e) {
    return null;
  }
}

export function setTemporaryToken({ userToken }: SET_SESSION_TOKEN): boolean {
  try {
    if (userToken) {
      const hashed_token = btoa(userToken);

      const jwt: { exp: number } = jwtDecode(userToken); // Define the structure of the decoded JWT
      const expiry = jwt.exp;
      if (Date.now() >= expiry * 1000) {
        return false;
      }

      localStorage.setItem(temp_token_key, hashed_token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
export function verifyPermission(permission: string): string[] | null {
  try {
    const perms = JSON.parse(
      localStorage.getItem(permissions_key_name) || "[]",
    );
    return perms.includes(permission);
  } catch (e) {
    return null;
  }
}

export function getTemporaryToken(): string | null | undefined {
  try {
    const session_key = localStorage.getItem(temp_token_key);
    if (session_key) {
      const plain_session_key = atob(session_key);
      return plain_session_key;
    }
  } catch (e) {
    return null;
  }
}
export function deleteTempSession(): void {
  localStorage.remove(temp_token_key);
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
