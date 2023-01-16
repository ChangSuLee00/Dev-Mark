import express from "express";
// if (!export default) => import * as ...
import morgan from "morgan";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import passport from "passport";
import hpp from "hpp";
import helmet from "helmet";
// import { sequelize } from "./models";
import {test} from "./routes/test.js";

/* Dotenv */
dotenv.config();

/* Express */
const app = express();

/* Prod */
const prod: boolean = process.env.NODE_ENV === "production";

/* Router */
// const router = express.Router();

/* Port */
app.set("port", prod ? process.env.PORT : 5000);

/* Sequelize */
// sequelize
//   .sync({ force: true })
//   // 서버 재시작마다 테이블 초기화 여부
//   .then(() => {
//     console.log("데이터베이스 연결 성공");
//   })
//   .catch((err: Error) => {
//     // 기본적 JS에러
//     // 이후에 인터페이스 늘어나면 타입을 확장을 해야할
//     console.error(err);
//   });

/* Morgan, Hpp, Helmet */
if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

/* Middlewares */
app.use("/", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
      httpOnly: true,
      secure: false,
      // 배포시 https사용하도록 설정하고 true로
      domain: prod ? "dev-mark.com" : undefined,
    },
    name: "session-cookie",
  })
);
app.use(passport.initialize());
app.use(passport.session());

/* Router */
// const test = require("./routes/test.js");
// const auth = require("./routes/auth.js");

app.use("/api", test);
// app.use("/auth", auth);

/* Listen */
app.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get("port")}`);
});

// export default router;
