import {Routes, Route} from "react-router";

function Page() {
    return (
        <div className='container-fluid container-lg my-5'>
            <Routes>
                <Route path="/" element={<h1>Home</h1>}/>
                <Route path="/login" element={<h1>LogIn</h1>}/>
                <Route path="/signup" element={<h1>SignUp</h1>}/>
            </Routes>
        </div>
    );
}

export default Page;
