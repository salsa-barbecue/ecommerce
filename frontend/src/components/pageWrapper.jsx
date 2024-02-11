import Header from "./header";

export const PageWrapperAuthenticated = ({children}) => {
    return <>
        <Header />
        {children}
    </>
}

export const pageWrapperUnauthenticated = ({children}) => {
    return <>{children}</>
}
