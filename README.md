# mbu-api
API backend for Merit Badge University

# Security

## Key and Certificate Creation

1. Create private key

    ```openssl genrsa -out mbu-server-key.pem 2048```
    
1. Create a Certificate Signing Request (CSR) file
    
    ```openssl req -new -sha256 -key mbu-server-key.pem -out mbu-csr.pem```

1. Use the CSR to generate a self-signed certificate

    ```openssl x509 -req -in mbu-csr.pem -signkey mbu-server-key.pem -out mbu-server-cert.pem```

  * Note: The other option (recommended for production) is to send the CSR to a Certificate Authority for signing. 
   
1. Concatenate all Certificate Authority (CA) certs into a single file.  Here, because we are self-signed, there is only one.
   
   ```cat mbu-server-cert.pem > mbu-fullchain-cert.pem```
   
  * Note: The fullchain bundle should be constructed with the least authoritative certificate first - your server's certificate, followed by the furthest removed intermediate, and then the next closest to the root, etc.  For more details about this see:  [ssl-root-cas](https://www.npmjs.com/package/ssl-root-cas)
   
1. Use the certificate tp generate a .pfx file

    ```openssl pkcs12 -export -in mbu-server-cert.pem -inkey mbu-server-key.pem -certfile mbu-fullchain-cert.pem -out mbu.pfx```
    