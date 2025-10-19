const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  console.log("MONGO_URI:", process.env.MONGO_URL); // 디버깅용 출력

  const uri = process.env.MONGO_URL;
  if (!uri) {
    console.error("MONGO_URI 환경 변수가 정의되지 않았습니다.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB 연결 성공");
  } catch (err) {
    console.error("MongoDB 연결 실패:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
