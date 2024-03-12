import { CourseType } from "../@types";

export const courseIds = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
] as const;

export const schedules = [
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
];

export const grades = [
    "未就学児",
    "小学校1年",
    "小学校2年",
    "小学校3年",
    "小学校4年",
    "小学校5年",
    "小学校6年",
    "中学校1年",
    "中学校2年",
    "中学校3年",
    "その他",
];

export const courseById: CourseType = {
    "A": {
        title: "DNAストラップ/星形ストラップ",
        target: "小学生以上 ※低学年は保護者同伴",
        icon: require(`../assets/A.png`),
    },
    "B": {
        title: "メタル飛行機",
        target: "小学生以上 ※低学年は保護者同伴",
        icon: require(`../assets/B.png`),
    },
    "C": {
        title: "ピンホール・レンズカメラ",
        target: "小学生以上 ※低学年は保護者同伴",
        icon: require(`../assets/C.png`),
    },
    "D": {
        title: "ふしぎな水そう",
        target: "誰でも",
        icon: require(`../assets/D.png`),
    },
    "E": {
        title: "球体ロボットでプログラミング体験",
        target: "小学生以上 ※低学年は保護者同伴",
        icon: require(`../assets/E.png`),
    },
    "F": {
        title: "電卓を分解して自分だけのアクセサリーを作ろう",
        target: "小学生以上 ※低学年は保護者同伴",
        icon: require(`../assets/F.png`),
    },
};