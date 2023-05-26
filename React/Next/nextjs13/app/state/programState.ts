import { atom } from 'recoil'
import { Program } from '../program/program'

//programの状態を管理する
export const programState = atom<Program[]>({
    key: "programState",
    default: [{
        id:0,
        name: "番組0",
        approval: false,
        situation: 0
    },
    {
        id:1,
        name: "番組1",
        approval: true,
        situation: 10
    }]
})