class StorageDecorator {
    wrappedStorage;
    constructor(wrappedStorage) {
        this.wrappedStorage = wrappedStorage;
    }
    async write(filename, data) {
        return this.wrappedStorage.write(filename, data);
    }
    async read(filename) {
        return this.wrappedStorage.read(filename);
    }
}
class EncryptionDecorator extends StorageDecorator {
    async write(filename, data) {
        console.log("Encrypting data before writing..." + data);
        const encryptedData = `encrypted::${data}`;
        console.log("Data encrypted. Writing to storage...");
        return super.write(filename, encryptedData);
    }
    async read(filename) {
        console.log("Reading data from storage for file in EncryptionDecorator: " + filename);
        const encryptedData = await super.read(filename);
        console.log("Decrypting data after reading..." + encryptedData);
        const decryptedData = encryptedData.replace("encrypted::", "");
        console.log("Data decrypted. Returning to caller...");
        return decryptedData;
    }
}
class CompressionDecorator extends StorageDecorator {
    async write(filename, data) {
        console.log("Compressing data before writing..." + data);
        const compressedData = `compressed::${data}`;
        console.log("Data compressed. Writing to storage...");
        return super.write(filename, compressedData);
    }
    async read(filename) {
        console.log("Reading data from storage for file in CompressionDecorator: " + filename);
        const compressedData = await super.read(filename);
        console.log("Decompressing data after reading..." + compressedData);
        const decompressedData = compressedData.replace("compressed::", "");
        console.log("Data decompressed. Returning to caller...");
        return decompressedData;
    }
}
class StorageService {
    storage = {};
    async write(filename, data) {
        console.log(`Writing data to storage: ${data}`);
        this.storage[filename] = data;
    }
    async read(filename) {
        console.log(`Reading data from storage for file in StorageService: ${filename}`);
        return this.storage[filename] || "";
    }
}
const storage = new CompressionDecorator(new EncryptionDecorator(new StorageService()));
storage.write("file1.txt", "Hello, World!");
storage.read("file1.txt").then(data => console.log("Final read data: " + data));
// export {};
