import Layout from "./Layout";

const Closed = (): JSX.Element => {
    return (
        <Layout>
            <span className="text-3xl">講座は終了しました。</span>
            <div className="my-5">
                <p>ご参加いただきありがとうございました。</p>
                <p>今後のイベントもぜひご参加ください。</p>
            </div>
        </Layout>
    );
}

export default Closed;