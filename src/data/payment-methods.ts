export type PaymentType = "bank-transfer" | "e-wallet" | "qris";

export interface BankDetails {
  bankFullName: string;
  accountNumber: string;
  accountHolder: string;
  accountType: string;
  steps: string[];
}

export interface WalletDetails {
  phoneNumber: string;
  accountName: string;
  steps: string[];
}

export interface PaymentMethod {
  id: string;
  label: string;
  type: PaymentType;
  typeLabel: string;
  logoSrc: string;
  bankDetails?: BankDetails;
  walletDetails?: WalletDetails;
  qrisImageSrc?: string | null;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "bca",
    label: "BCA",
    type: "bank-transfer",
    typeLabel: "Transfer",
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg",
    bankDetails: {
      bankFullName: "Bank Central Asia (BCA)",
      accountNumber: "0980240754",
      accountHolder: "Heri Yulianto",
      accountType: "Tahapan",
      steps: [
        "Login ke BCA Mobile atau datang ke ATM",
        "Pilih menu Transfer",
        "Masukkan nomor rekening: 0980240754",
        "Masukkan nominal sesuai total pembayaran",
        "Pastikan nama penerima: Heri Yulianto",
        "Konfirmasi dan simpan bukti transfer",
        "Upload bukti transfer di form ini",
      ],
    },
  },
  {
    id: "mandiri",
    label: "Mandiri",
    type: "bank-transfer",
    typeLabel: "Transfer",
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg",
    bankDetails: {
      bankFullName: "Bank Mandiri",
      accountNumber: "1090020123456",
      accountHolder: "Heri Yulianto",
      accountType: "Tabungan",
      steps: [
        "Login ke Mandiri Online atau datang ke ATM",
        "Pilih menu Transfer ke Rekening Mandiri",
        "Masukkan nomor rekening: 1090020123456",
        "Masukkan nominal sesuai total pembayaran",
        "Pastikan nama penerima: Heri Yulianto",
        "Konfirmasi dan simpan bukti transfer",
        "Upload bukti transfer di form ini",
      ],
    },
  },
  {
    id: "seabank",
    label: "SeaBank",
    type: "bank-transfer",
    typeLabel: "Transfer",
    logoSrc: "https://upload.wikimedia.org/wikipedia/commons/a/ac/SeaBank.svg",
    bankDetails: {
      bankFullName: "SeaBank Indonesia",
      accountNumber: "901234567890",
      accountHolder: "Heri Yulianto",
      accountType: "Tabungan",
      steps: [
        "Buka aplikasi SeaBank atau m-banking lain",
        "Pilih Transfer ke Bank Lain → SeaBank",
        "Masukkan nomor rekening: 901234567890",
        "Masukkan nominal sesuai total pembayaran",
        "Pastikan nama penerima: Heri Yulianto",
        "Konfirmasi dan simpan bukti transfer",
        "Upload bukti transfer di form ini",
      ],
    },
  },
  {
    id: "ovo",
    label: "OVO",
    type: "e-wallet",
    typeLabel: "E-Wallet",
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg",
    walletDetails: {
      phoneNumber: "081234567890",
      accountName: "Heri Yulianto",
      steps: [
        "Buka aplikasi OVO",
        "Pilih Transfer",
        "Masukkan nomor: 081234567890",
        "Masukkan nominal sesuai total pembayaran",
        "Pastikan nama: Heri Yulianto",
        "Konfirmasi dan simpan bukti",
        "Upload bukti di form ini",
      ],
    },
  },
  {
    id: "dana",
    label: "DANA",
    type: "e-wallet",
    typeLabel: "E-Wallet",
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg",
    walletDetails: {
      phoneNumber: "081234567890",
      accountName: "Heri Yulianto",
      steps: [
        "Buka aplikasi DANA",
        "Pilih Kirim Uang",
        "Masukkan nomor: 081234567890",
        "Masukkan nominal sesuai total pembayaran",
        "Pastikan nama: Heri Yulianto",
        "Konfirmasi dan simpan bukti",
        "Upload bukti di form ini",
      ],
    },
  },
  {
    id: "gopay",
    label: "GoPay",
    type: "e-wallet",
    typeLabel: "E-Wallet",
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg",
    walletDetails: {
      phoneNumber: "081234567890",
      accountName: "Heri Yulianto",
      steps: [
        "Buka Gojek → GoPay",
        "Pilih Kirim",
        "Masukkan nomor: 081234567890",
        "Masukkan nominal sesuai total pembayaran",
        "Pastikan nama: Heri Yulianto",
        "Konfirmasi dan simpan bukti",
        "Upload bukti di form ini",
      ],
    },
  },
  {
    id: "shopeepay",
    label: "ShopeePay",
    type: "e-wallet",
    typeLabel: "E-Wallet",
    logoSrc: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg",
    walletDetails: {
      phoneNumber: "081234567890",
      accountName: "Heri Yulianto",
      steps: [
        "Buka Shopee → ShopeePay",
        "Pilih Transfer",
        "Masukkan nomor: 081234567890",
        "Masukkan nominal sesuai total pembayaran",
        "Pastikan nama: Heri Yulianto",
        "Konfirmasi dan simpan bukti",
        "Upload bukti di form ini",
      ],
    },
  },
  {
    id: "qris",
    label: "QRIS",
    type: "qris",
    typeLabel: "Scan QR",
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/e/e0/QRIS_Logo.svg",
    // Ganti dengan URL gambar QRIS asli
    qrisImageSrc: null,
  },
];
