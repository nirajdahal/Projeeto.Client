import Header from "./Header"
import pagesRoutes from '../routes/index'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import routes from '../routes'
import { Suspense, lazy } from 'react'
import SuspenseContent from "./SuspenseContent"
import { useSelector } from 'react-redux'
import jwt_decode from "jwt-decode";
import { useEffect, useRef } from "react"
const Page404 = lazy(() => import('../pages/protected/404'))
const token = localStorage.getItem('token')
function PageContent() {
    const location = useLocation();
    let currentPath = location.pathname;
    const mainContentRef = useRef(null);
    const { pageTitle } = useSelector(state => state.header)
    currentPath = currentPath.replace('/app', '')
    const accesibleRoles = getRouteWithCurrentPath(currentPath)[0].isAccessible
    const decodedToken = jwt_decode(token)
    const isAccessible = checkIsAccessibleByRole(accesibleRoles, decodedToken.role)
    if (!isAccessible) {
        window.location.href = "/app/welcome"
    }
    function getRouteWithCurrentPath(path) {
        return pagesRoutes.filter(route => route.path === path);
    }
    function checkIsAccessibleByRole(roles, role) {
        if (roles.includes(role)) {
            return true
        }
        else {
            return false
        }
    }
    // Scroll back to top on new page load
    useEffect(() => {
        mainContentRef.current.scroll({
            top: 0,
            behavior: "smooth"
        });
    }, [pageTitle])
    return (
        <div className="drawer-content flex flex-col ">
            <Header />
            <main className="flex-1 overflow-y-auto pt-8 px-6  bg-base-200" ref={mainContentRef}>
                <Suspense fallback={<SuspenseContent />}>
                    <Routes>
                        {
                            routes.map((route, key) => {
                                return (
                                    <Route
                                        key={key}
                                        exact={true}
                                        path={`${route.path}`}
                                        element={<route.component />}
                                    />
                                )
                            })
                        }
                        {/* Redirecting unknown url to 404 page */}
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </Suspense>
                <div className="h-16"></div>
            </main>
        </div>
    )
}
export default PageContent
