# 📦 QRIS Parser (JavaScript)

Library sederhana untuk **parse string QRIS (EMVCo TLV format)** menjadi struktur JSON yang mudah dibaca.
Mendukung nested tag untuk **Merchant Account Information (26–51)** dan bisa dikembangkan untuk validasi **CRC16-CCITT**.

---

## 🚀 Instalasi

```bash
npm install @misterdevs/qris-parser
```

atau

```bash
yarn add @misterdevs/qris-parser
```

---

## 📖 Penggunaan

### 1. Import dan parsing QRIS

```javascript
import { qrisparser } from "@misterdevs/qris-parser";

const qrisStr =
  "00020101021126610014COM.GO-JEK.WWW01189360091234285490450210G6285936550303UMI51440014ID.CO.QRIS.WWW0215ID10253801632580303UMI5204504553033605802ID5910Misterdevs6007JAKARTA61051234562070703A016304M2B3";

const parsed = qrisparser(qrisStr);

console.log(parsed);
```

### Output

```json
{
  "26": {
    "length": 61,
    "00": { "length": 14, "value": "COM.GO-JEK.WWW" },
    "01": { "length": 18, "value": "936009123428549045" },
    "02": { "length": 10, "value": "G628593655" },
    "03": { "length": 3, "value": "UMI" }
  },
  "51": {
    "length": 44,
    "00": { "length": 14, "value": "ID.CO.QRIS.WWW" },
    "02": { "length": 15, "value": "ID1025380163258" },
    "03": { "length": 3, "value": "UMI" }
  },
  "52": { "name": "Merchant Category Code", "length": 4, "value": "5045" },
  "53": { "name": "Transaction Currency", "length": 3, "value": "360" },
  "54": { "name": "Transaction Amount", "length": 9, "value": "undefined" },
  "58": { "name": "Country Code", "length": 2, "value": "ID" },
  "59": { "name": "Merchant Name", "length": 10, "value": "Misterdevs" },
  "60": { "name": "Merchant City", "length": 7, "value": "JAKARTA" },
  "61": { "name": "Postal Code", "length": 5, "value": "12345" },
  "62": { "length": 7, "07": { "length": 3, "value": "A01" } },
  "63": { "name": "CRC", "length": 4, "value": "M2B3" },
  "00": { "name": "Payload Format Indicator", "length": 2, "value": "01" },
  "01": { "name": "Point of Initiation Method", "length": 2, "value": "12" }
}
```

---

## 🏷 Struktur Tag QRIS (ringkas)

- `00` → Payload Format Indicator
- `01` → Point of Initiation Method (11 = Static, 12 = Dynamic)
- `26–51` → Merchant Account Information (subtag `00`, `01`, `02`, …)
- `52` → Merchant Category Code
- `53` → Transaction Currency (360 = IDR)
- `54` → Transaction Amount
- `55–57` → Tip/Convenience Fee (opsional)
- `58` → Country Code
- `59` → Merchant Name
- `60` → Merchant City
- `61` → Postal Code (opsional)
- `62` → Additional Data Field (contoh: `01` = invoice ID)
- `63` → CRC (checksum, 4 hex)

---
