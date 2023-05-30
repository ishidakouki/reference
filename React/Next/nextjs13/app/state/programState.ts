import { atom, selector } from 'recoil'
import { Program } from '../program/program'
import { recoilPersist } from "recoil-persist";
import { search }  from "../component/search/search";

//標準でrecoil-persistというkey名でwebstorageに保存される（オプションで指定可能）
const { persistAtom } = recoilPersist();

//programの状態を管理する
export const programState = atom<Program[]>({
    key: "programState",
    default: [],
    effects_UNSTABLE: [persistAtom]
})


//検索条件を管理する
//TODO: 型を定義する
export const SearchCondition = atom<any>({
    key: "SearchCondition",
    default:
        {
            id: "asc",
            name: "",
            approval: "true",
            situation: {
                0: true,
                10: false,
                20: true,
            }
        }
    ,
})

//次のidを算出する
export const nextProgramId = selector<number>({
    key: "nextProgramId",
    get : ({ get }) => {
        //登録されている番組情報を取得
        const calculationProgram:Array<Program> = get(programState);

        if(calculationProgram.length > 0) {
            //取得した番組情報のidの中で一番大きい値を調べて、+1をして返す
            let calculationProgramId = calculationProgram.map((program) => program.id)

            let maxProgramId = Math.max(...calculationProgramId)+1;

            return maxProgramId;
        }
        return 1;
    }
})



//一覧に出力用の番組の配列を作成する
export const searchProgram = selector<Program[]>({
    key:"searchProgram",
    get : ({ get }) => {
        //登録されている番組情報を取得
        const programList:Array<Program> = get(programState);

        //検索条件を取得
        //TODO: 型を定義する
        const serachValue:Array<any> = get(SearchCondition)

        //検索関数を呼び出し検索結果を出力
        let newProgram = search(programList,serachValue)

        //結果を返す
        return newProgram


    }
})
