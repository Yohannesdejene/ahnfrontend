function getTokenExpirationDate(token) {
  if (!token) return null;

  const payload = token.split(".")[1]; // Get the payload part of the JWT
  const decodedPayload = JSON.parse(
    atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
  ); // Decode Base64Url to JSON

  if (decodedPayload.exp) {
    return new Date(decodedPayload.exp * 1000); // Convert to milliseconds
  }

  return null; // If there's no exp claim
}

// Your JWT token
const jwtToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hbGhvc255OTZAZ21haWwuY29tIiwiaWF0IjoxNzI1NDMzMDQ4LCJleHAiOjQ4NzkwMzMwNDh9.p2yx6bm_a4sJZ4JYWCRC941Y_65muXMbaNooqJOQTNg";
const expirationDate = getTokenExpirationDate(jwtToken);

if (expirationDate) {
  console.log("Token expires at:", expirationDate);
} else {
  console.log("No expiration date found in token.");
}
