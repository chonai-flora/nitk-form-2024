import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <div>
            <div className="md:w-180 md:m-auto mx-auto bg-white shadow-xl">
                <header
                    className={
                        "px-3 py-16 mb-10 text-3xl text-white text-center text-shadow " +
                        "bg-cover bg-gray-600 bg-header-img bg-blend-overlay"
                    }
                >
                    <h1>
                        熊本高専わいわい工作わくわく実験ひろば<br />
                        申し込みフォーム
                    </h1>
                </header>

                <div className="md:m-auto px-5 pb-1 mx-2 bg-white">
                    {children}
                </div>
            </div>

            <p className="m-4 text-center">&copy; 2024 NITK Form</p>
        </div >
    );
}

export default Layout;
