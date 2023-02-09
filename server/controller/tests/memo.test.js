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
const memo_js_1 = require("../../controller/memo.js");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
jest.mock("../../models/memo.js");
const memo_js_2 = __importDefault(require("../../models/memo.js"));
let req, res, next;
// beforeEach 위에서 선언 해주어야 각각 넣어줄 수 있다.
beforeEach(() => {
    req = node_mocks_http_1.default.createRequest();
    res = node_mocks_http_1.default.createResponse();
    next = jest.fn();
});
describe("createMemo", () => {
    beforeEach(() => {
        req.user = { id: 1 };
        // 각각의 요소에 이메일 등록에 사용될 req.body를 넣어준다.
        req.body = {
            memoName: "temp_memo",
            memoContent: "temp_memo_content",
            bookmarkId: 1,
        };
        // Registration 내부에서 사용할 함수도 모킹해준다.
        // 테스트 통과를 가정하고 특정 value를 return하도록 mockResolvedValue
        // (Memo.findOne as jest.Mock).mockResolvedValue(null);
        memo_js_2.default.create.mockResolvedValue({});
    });
    it("메모 생성", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, memo_js_1.createMemo)(req, res, next);
        expect(res.statusCode).toBe(201);
        // res의 statusCode가 201로 return된다.
    }));
    it("메모 에러 발생", () => __awaiter(void 0, void 0, void 0, function* () {
        req.body = null;
        // req.body 없을 경우.
        try {
            yield (0, memo_js_1.createMemo)(req, res, next);
        }
        catch (error) {
            expect(error).toBeTruthy();
            // 에러가 발생한다.
        }
    }));
});
describe("readMemo", () => {
    beforeEach(() => {
        req.user = { id: 1 };
        req.body = {
            box: "temp_box",
            url: "temp_box_url",
            UserId: 1,
        };
    });
    it("메모가 있다면 메모 읽어온다", () => __awaiter(void 0, void 0, void 0, function* () {
        const renderMemos = { id: 1 };
        memo_js_2.default.findAll.mockResolvedValue(renderMemos);
        yield (0, memo_js_1.renderMemo)(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        // res.status(200).send(); 같이 만약 보내오는 데이터가 있다면
        // send가 잘 보내져 왔다고 Truthy
        expect(res._getJSONData()).toStrictEqual(renderMemos);
        // 보내져 오는 json 데이터가 ~~와 같다
    }));
    it("메모가 없다면 end()", () => __awaiter(void 0, void 0, void 0, function* () {
        const renderMemos = null;
        memo_js_2.default.findAll.mockResolvedValue(renderMemos);
        const spyFn = jest.spyOn(res, "end");
        // 가짜함수로 대체하지 않음 ( 결괏값이 실제 구현 값 )
        // res라는 객체의 end라는 함수에 spy를 붙여서 정보를 캘 수 있다.
        yield (0, memo_js_1.renderMemo)(req, res, next);
        expect(spyFn).toBeCalled();
    }));
    it("메모 읽어오며 에러 발생", () => __awaiter(void 0, void 0, void 0, function* () {
        req.user = null;
        // req.user가 없을 경우.
        try {
            yield (0, memo_js_1.createMemo)(req, res, next);
        }
        catch (error) {
            expect(error).toBeTruthy();
            // 에러가 발생한다.
        }
    }));
});
describe("updateMemo", () => {
    beforeEach(() => {
        req.user = { id: 1 };
        req.body = {
            memoName: "temp_box",
            memoContent: "temp_box_url",
            id: 1,
        };
    });
    it("요소가 전부 있다면 메모 수정", () => __awaiter(void 0, void 0, void 0, function* () {
        memo_js_2.default.update.mockResolvedValue(null);
        yield (0, memo_js_1.updateMemo)(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(next).toBeCalled();
        // update가 성공하면 next가 불려올 것이다.
    }));
    it("업데이트할 정보가 없는 경우 error", () => __awaiter(void 0, void 0, void 0, function* () {
        req.body = {};
        // body에 정보가 없는 경우.
        const errorMessage = { message: "Error" };
        // 에러메시지.
        memo_js_2.default.update.mockResolvedValue(Promise.reject(errorMessage));
        // 비동기로 에러 메시지가 온다.
        yield (0, memo_js_1.updateMemo)(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
        // 에러메시지가 next로와 함께 불린다.
    }));
    it("메모 업데이트 하면서 에러 발생", () => __awaiter(void 0, void 0, void 0, function* () {
        req.body.id = null;
        // req.user가 없을 경우.
        memo_js_2.default.update.mockResolvedValue(null);
        try {
            yield (0, memo_js_1.updateMemo)(req, res, next);
        }
        catch (error) {
            expect(error).toBeTruthy();
            // 에러가 발생한다.
        }
    }));
});
describe("deleteMemo", () => {
    beforeEach(() => {
        req.user = { id: 1 };
        req.body = {
            id: 1,
        };
    });
    it("d_id가 있다면 삭제", () => __awaiter(void 0, void 0, void 0, function* () {
        memo_js_2.default.destroy.mockResolvedValue(null);
        yield (0, memo_js_1.deleteMemo)(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(next).toBeCalled();
        // update가 성공하면 next가 불려올 것이다.
    }));
    it("d_id가 없다면 에러", () => __awaiter(void 0, void 0, void 0, function* () {
        req.body = {};
        // body의 id를 삭제한다.
        const errorMessage = { message: "Error" };
        // 에러메시지.
        memo_js_2.default.destroy.mockResolvedValue(Promise.reject(errorMessage));
        // 비동기로 에러 메시지가 온다.
        yield (0, memo_js_1.deleteMemo)(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
        // 에러메시지가 next로와 함께 불린다.
    }));
});
