import { useEffect } from "react"
import { GetCurrentUser } from "../../apicalls/user"

function Home () {
    console.log('Home useEffect')
    useEffect(() => {
        const fetchUser = async () => {
            const res = await GetCurrentUser()
            console.log('Response from Home get curr user',res)
        }
        fetchUser()
    }, [])
    return <>
        <h1>I'm a Home page</h1>
    </>
}
export default Home