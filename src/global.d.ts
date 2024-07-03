// Fichier de déclaration de déclaration de types pour typescript
declare module 'images/*' {
    const value: any;
    export default value;
  }

  declare module 'data/*' {
    const value: any;
    export default value;
  }

  declare module 'screens/*' {
    const value: any;
    export default value;
  }

  declare module 'components/*' {
    const value: any;
    export default value;
  }

  declare module 'utils/*' {
    const value: any;
    export default value;
  }

  declare module 'services/*' {
    const value: any;
    export default value;
  }

  declare module "@env" {
    export const API_URL: string;
}

declare module 'react-native-crypto-js' {
  var AES: any;
  var SHA256: any;
  export { AES, SHA256 };
}
