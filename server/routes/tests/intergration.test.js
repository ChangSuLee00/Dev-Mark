"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_js_1 = require("../../models/index.js");
const index_js_2 = __importDefault(require("../../index.js"));
/* Fake ORM */
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield index_js_1.sequelize.sync({ force: true });
    // 기본은 false
}));
/* Registration Test */
describe("POST /registration", () => {
    it("회원가입", (done) => {
        // done -> 비동기 함수
        (0, supertest_1.default)(index_js_2.default)
            .post("/api/user/registration")
            .send({
            email: "temp@example.com",
            password: "temp",
            nick: "temp",
        })
            .expect(201, done);
        // ststus 201을 반환하고 종료
    });
});
/* Login Test1 */
describe("POST /login", () => {
    const agent = supertest_1.default.agent(index_js_2.default);
    beforeAll((done) => {
        /* 이미 로그인된 상황 연출 */
        agent
            .post("/api/user/login")
            .send({
            email: "temp@example.com",
            password: "temp",
        })
            .end(done);
    });
    it("Already loggedin", (done) => {
        agent
            .post("/api/user/login")
            .send({
            email: "temp@example.com",
            password: "temp",
        })
            .expect(401, { Error: "Already loggedin" })
            // { Error: "Already loggedin" } 반환하고 종료
            .end(done);
    });
});
/* Login test2 */
describe("POST /login", () => {
    it("user is not registered", (done) => {
        (0, supertest_1.default)(index_js_2.default)
            .post("/api/user/login")
            .send({
            email: "NotRegisterd@example.com",
            password: "temp",
        })
            .expect(401, { Error: "user is not registered" })
            // { Error: "user is not registered" } 반환하고 종료
            .end(done);
    });
    it("login", (done) => {
        (0, supertest_1.default)(index_js_2.default)
            .post("/api/user/login")
            .send({
            email: "temp@example.com",
            password: "temp",
        })
            .expect(200, done);
        // status 200 반환하고 종료
    });
    it("password do not match", (done) => {
        (0, supertest_1.default)(index_js_2.default)
            .post("/api/user/login")
            .send({
            email: "temp@example.com",
            password: "1111",
        })
            .expect(401, { Error: "password do not match" })
            // 401 인증 실패
            // { Error: "password do not match" } 반환하고 종료
            .end(done);
    });
});
/* Logout Test */
describe("GET /logout", () => {
    it("unloggedin", (done) => {
        (0, supertest_1.default)(index_js_2.default)
            .post("/api/user/logout")
            .expect(403, { Error: "Login required" })
            .end(done);
        // 403 금지됨
        // proxy로 분리되어 있기 때문에 redirect url 만들어주지 않고
        // 모달창으로 에러 메시지 전달
        // status = 403, { Error: "Login required" } 반환하고 종료
    });
    const agent = supertest_1.default.agent(index_js_2.default);
    beforeEach((done) => {
        agent
            .post("/api/user/login")
            .send({
            email: "temp@example.com",
            password: "temp",
        })
            .end(done);
    });
    it("logout", (done) => {
        agent
            .post("/api/user/logout")
            .expect(200)
            // 200코드 전달 이후 end()
            .end(done);
    });
});
/* Box CRUD */
describe("Box CRUD", () => {
    const agent = supertest_1.default.agent(index_js_2.default);
    beforeEach((done) => {
        agent
            .post("/api/user/login")
            .send({
            email: "temp@example.com",
            password: "temp",
        })
            .end(done);
    });
    // Box create
    it("POST /box", (done) => {
        agent
            .post("/api/box")
            .send({
            box: "temp_box",
            img: "/img/default",
            UserId: 1,
        })
            .expect(201, done);
    });
    // Box read
    it("Get /box", (done) => {
        agent.get("/api/box").send({}).expect(200, done);
    });
    // Box update
    it("Patch /box", (done) => {
        agent
            .patch("/api/box")
            .send({
            box: "temp_box",
            img: "/img/default",
            id: 1,
        })
            .expect(200, done);
    });
    // Box delete
    it("Delete /api/box", (done) => {
        agent
            .delete("/api/box")
            .send({
            img: "/img/default",
            id: 1,
        })
            .expect(200, done);
    });
});
/* Bookmark CRUD */
describe("Bookmark CRUD", () => {
    const agent = supertest_1.default.agent(index_js_2.default);
    beforeEach((done) => {
        agent
            .post("/api/user/login")
            .send({
            email: "temp@example.com",
            password: "temp",
        })
            .end(done);
    });
    // Bookmark create
    it("POST /content", (done) => {
        agent
            .post("/api/content")
            .send({
            bookmarkName: "temp_content",
            bookmarkURL: "temp_URL",
            // boxId: 1,
        })
            .expect(201, done);
    });
    // Bookmark read
    it("Get /content", (done) => {
        agent.get("/api/content?boxId=1").send({}).expect(200, done);
        // 쿼리로 BoxId 전달
    });
    // Bookmark update
    it("Patch /content", (done) => {
        agent
            .patch("/api/content")
            .send({
            contentName: "temp_box2",
            URL: "temp_URL2",
            id: 1,
        })
            .expect(200, done);
    });
    // Bookmark delete
    it("Delete /api/content", (done) => {
        agent
            .delete("/api/content")
            .send({
            id: 1,
        })
            .expect(200, done);
    });
});
/* Memo CRUD */
describe("Memo CRUD", () => {
    const agent = supertest_1.default.agent(index_js_2.default);
    beforeEach((done) => {
        agent
            .post("/api/user/login")
            .send({
            email: "temp@example.com",
            password: "temp",
        })
            .end(done);
    });
    // Memo create
    it("POST /memo", (done) => {
        agent
            .post("/api/memo")
            .send({
            memoName: "temp_content",
            memoContent: "temp_URL",
            BookmarkId: 1,
        })
            .expect(201, done);
    });
    // Memo read - all
    it("Get /memo", (done) => {
        agent.get("/api/memo").send({}).expect(200, done);
        // 메모 전체 가져오기
    });
    // Memo read - each
    it("Get /memo/each", (done) => {
        agent.get("/api/memo/each?memoId=1").send({}).expect(200, done);
        // 메모 일부 가져오기
    });
    // memo update
    it("Patch /memo", (done) => {
        agent
            .patch("/api/memo")
            .send({
            memoName: "temp_box2",
            memoContent: "temp_URL2",
            id: 1,
        })
            .expect(200, done);
    });
    // memo delete
    it("Delete /api/memo", (done) => {
        agent
            .delete("/api/memo")
            .send({
            id: 1,
        })
            .expect(200, done);
    });
});
/* Bookmark CRUD */
describe("Alarm CRUD", () => {
    const agent = supertest_1.default.agent(index_js_2.default);
    beforeEach((done) => {
        agent
            .post("/api/user/login")
            .send({
            email: "temp@example.com",
            password: "temp",
        })
            .end(done);
    });
    // Alarm create
    it("POST /alarm", (done) => {
        agent
            .post("/api/alarm")
            .send({
            alarmName: "temp_content",
            date: "Sat Feb 04 2023 16:30:53 GMT+0900",
        })
            .expect(201, done);
    });
    // Alarm read
    it("Get /alarm", (done) => {
        agent.get("/api/alarm").send({}).expect(200, done);
    });
    // Alarm delete
    it("Delete /api/alarm", (done) => {
        agent
            .delete("/api/alarm")
            .send({
            id: 1,
        })
            .expect(200, done);
    });
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield index_js_1.sequelize.sync({ force: true });
}));
