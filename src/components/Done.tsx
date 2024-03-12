import { useLocation, Navigate } from "react-router-dom";

import Layout from "./Layout";

const Done = (): JSX.Element => {
    const location = useLocation();

    if (location.state == null) {
        return <Navigate replace to="/" />;
    }

    const state = location.state;

    const Succeeded = (): JSX.Element => {
        return (
            <Layout>
                <span className="text-3xl text-green-400">&#x2714;&nbsp;</span>
                <span className="text-3xl">申し込みを受け付けました！</span>
                <p className="mt-5">お申込みいただきありがとうございます。</p>
                <p>申込時間の5分前には受付へお越しください。</p>


                <p className="mt-12">以下の内容を受け付けました。</p>
                <p>スクリーンショット等で保存されてください。</p>

                <div className="px-3 py-2 my-4 text-sm bg-red-100 rounded-md">
                    <p>お名前: {state.name}</p>
                    <p>学年: {state.grade}</p>
                    <p>メールアドレス: {state.email}</p>
                    <br />
                    <p>コース名: {state.title}</p>
                    <p>時間帯: {state.schedule}</p>
                </div>
            </Layout>
        );
    }

    const Failed = (): JSX.Element => {
        return (
            <Layout>
                <span className="text-3xl text-red-700">&#x2718;&nbsp;</span>
                <span className="text-3xl">送信できませんでした。</span>
                <p className="mt-5">選択されたコースが定員に達してしまった可能性があります。</p>
                <p>お手数をおかけしますが、通信環境等をご確認の上もう一度お試しください。</p>
                <p>ご不明な点がございましたら&ensp;
                    <a
                        href="mailto:y-wakuwaku@kumamoto-nct.ac.jp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        y-wakuwaku@kumamoto-nct.ac.jp
                    </a>
                    &ensp;までお問い合わせください。
                </p>
                <div className="mb-6" />
            </Layout>
        );
    }

    return state.status === "succeeded"
        ? <Succeeded />
        : <Failed />;
}

export default Done;