export default function IntToChar(int) {
    // 👇️ for Uppercase letters, replace `a` with `A`
    const code = 'A'.charCodeAt(0);
  
    return String.fromCharCode(code + int);
  }