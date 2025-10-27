export default function getToken(TOKEN_KEYS, SUB) {
    return TOKEN_KEYS[`${SUB}_TOKEN_KEY`];
}