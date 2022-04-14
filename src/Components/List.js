import { async } from '@firebase/util';
import { limit } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DB, STORAGE } from './Firebase';
import withConnect from './ReduxMap';
import { ServiceContext } from './ServiceContext';

const List = ({ reduxListSetter, reduxListStates }) => {

    let context = useContext(ServiceContext)
    let param = useParams();
    let searchRef = useRef (null)
    let navigate = useNavigate();
    let [search, setSearch] = useState("")
    let [page, setPage] = useState(1)
    let [list, setList] = useState([])
    let [pages, setPages] = useState([])
    let [refDoc, setRefDoc] = useState(null)
    let [listEnd, setListEnd] = useState(false)
    let [loading, setLoading]  = useState(false)
    useEffect(() => {
        // console.log("page" in param, !isNaN(param.page))
        getList()

    }, [])

    useEffect(() => context.log({ useEffectPages: pages }), [pages])
    useEffect(() => context.log({ useEffectPage: page }), [page])
    useEffect(() => context.log({ useEffectSearch: search }), [search])
    useEffect(() => {
        // console.log({ useEffectParam: param })
        if ("search" in param) { 
            window.history.pushState({}, "", "#/list/1/search/"+param.search)
            setSearch(param.search) 
        } 
        if ("page" in param && !isNaN(param.page)){
            if(Number(page.param) > 0) setPage(Number(param.page))
            // else window.history.pushState({}, "", "#/list/1")
        } 
    }, [param])
    useEffect(() => context.log({ useEffectList: list }), [list])

    useEffect(() => {
        // console.log({ list })
        if (list.length === 0) return;
        let localPages = [];
        let manyPages = Math.ceil(list.length / 10)
        // console.log({ totalPages: manyPages })
        for (let i = 0; i < manyPages; i++) {
            let localList = [];
            for (let ii = 0; ii < 10; ii++) {
                if (list[ii + (10 * i)]) localList.push(list[ii + (10 * i)])
            }
            localPages.push(localList)
        }

        setPages([...localPages])
        // console.log(Number(param.page), localPages.length)
        if(Number(param.page) >= localPages.length){
            window.history.pushState({}, "", "#/list/"+localPages.length+("search" in param ? "/search/"+param.search : ""))
            setPage(localPages.length)
        } 
        // console.log({ localPages })
    }, [list])

    let getList = () => {
        setLoading(true)
        let localPage = 1;

        if ("search" in param) {    
      
            context.log("search present", { list, page, pages, paramSearch: param.search });

            (async () => {
                let i = 0;
                let localRefDoc = null;
                let localList = [];
                setSearch(param.search);
                while (i < localPage) {
                    await filterList(localRefDoc).then(resp => {
                        localRefDoc = resp.localRefDoc;
                        localList = [...localList, ...resp.localList]

                    })
                    i++;
                }


                setPage(localPage)
                setList(localList)
                setRefDoc(localRefDoc)
                setLoading(false)
                // console.log(localList)

            })()
            return
        } else {
            if ("page" in param && !isNaN(param.page) && Number(param.page) > 0)  localPage = Number(param.page)
            else window.history.pushState({}, "", "#/list/1")
            setSearch("")
            // console.log("search empty")
            DB.readLimit("person", localPage).then(resp => {
                if(resp.list.length % 10 > 0) setListEnd(true)
                // console.log(resp.list)
                setList(resp.list)
                setPage(localPage)
                setRefDoc(resp.refDoc)
                setLoading(false)

            })
            return
        }

    }

    let filterList = async (argRefDoc) => {

        let localList = [];
        let localRefDoc = argRefDoc;

        while (localList.length < 10) {
            let stop = false;
            await DB.readBatch("person", localRefDoc).then(resp => {
                localRefDoc = resp.refDoc;

                resp.list.every(x => {
                    // console.log({
                    //     paramSearch: param.search, 
                    //     stateSearch: search, 
                    //     refSearch: searchRef.current.value
                    // })
                    if (x["fname"].includes(param.search)) {
                        // console.log(x["fname"])
                        localList.push(x)
                    }
                    if (localList.length >= 10) return false;
                    return true;
                })

                if (resp.list.length < 10) {
                    // console.log("stopped")
                    stop = true;
                    setListEnd(true)
                }
            })

            if (stop) break;

        }

        return { localList, localRefDoc }
    }

    let searchHandler = () => {

        // return console.log({searchHander: search})

        setListEnd(false)
        setList([])
        setPage(1)
        setPages([])
        if (search === "") {
            navigate("/list")
            // window.history.pushState({}, "", "#/list")
            return getList();
        }
        //  window.history.pushState({}, "", "#/list/1/search/"+searchRef.current.value)
        navigate("/list/1/search/" + searchRef.current.value)
        // param.search = search;
       
        // startSearch();
    }

    let startSearch = async () => {

        let localRefDoc = null;
        filterList(localRefDoc).then((resp) => {
            // console.log(resp)
            setList(resp.localList)
            setRefDoc(resp.localRefDoc)
            // console.log(resp.localList, resp.localRefDoc, search)
        })
    }

    let goPage = (e, n) => {
        e.preventDefault();
        // console.log(n)
        setPage(n)
        if (search !== "") window.history.pushState({}, "", "#/list/" + (n) + "/search/" + search)
        else window.history.pushState({}, "", "#/list/" + (n))

    }

    let showMore = (e) => {
        
        e.preventDefault()
        let localPage = page
        DB.readBatch("person", refDoc).then(resp => {
            let localList = resp.list
            if (localList.length < 10) setListEnd(true)
            
            if (search !== "") {
                // console.log({showMore: search, refDoc})
                filterList(refDoc).then(resp => {
                    setList([...list, ...resp.localList])
                    setRefDoc(resp.localRefDoc)
                    setPage(localPage + 1)
                    window.history.pushState({}, "", "#/list/" + (localPage + 1) + "/search/" + search)
                })


            } else {
                setList([...list, ...localList])
                setRefDoc(resp.refDoc)
                setPage(localPage + 1)
                window.history.pushState({}, "", "#/list/" + (localPage + 1))
            }
            //    console.log(resp.list)

        })
    }

    let deleteHandler = (e, data) => {
        e.preventDefault();
        let conf = window.confirm("Delete this person?")

        if (conf) {
            DB.deletes(data.id, "person")
            STORAGE.deletes(data.image)
            let newList = []
            list.forEach( e => {
                if(e.id !== data.id) newList.push(e)
            })

            setList(newList)
        }

    }

    let TableRow = ({ data, index }) => {
        return (
            <>
                <tr>
                    <td>{(index + 1) + ((10 * page) - 10)}</td>
                    <td>{data.fname} {data.lname}</td>
                    <td>{data.gender}</td>
                    <td>
                        <Link to={"/listview/" + data.id}>View</Link><span> </span>
                        <a href={"#/delete/" + data.id} onClick={e => deleteHandler(e, data)}>Delete</a>
                    </td>
                </tr>
            </>
        )
    }

    return (
        <>
            <h2>List</h2>


            <input
                ref={searchRef}
                onChange={e => setSearch(e.target.value)}
                type="text"
                value={search}
                placeholder={`by first name...`} />
           
            <button onClick={searchHandler}>Search</button>
            <span> </span>
            <button onClick={e => navigate("/listadd")}>Add</button>
            <br />
            {"search" in param  && <small>empty the field then search to reset</small>}
            {/* Type:
            <input
                type="radio"
                name="type"
                value="all"
                checked={{}}
                onChange={e => { }}
            /> All<span> </span>
            <input
                type="radio"
                name="type"
                value="fname"
                checked={{}}
                onChange={e => { }}
            /> First Name <span> </span>
            <input
                type="radio"
                name="type"
                value="lname"
                checked={{}}
                onChange={e => { }}
            /> Last Name */}

            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pages[page - 1] !== undefined ?
                    pages[page - 1].map((e, i) => <TableRow data={e} index={i} key={i} />)
                    :
                    !loading && list.length === 0 ? 
                    <tr><td>no results</td></tr>
                    :
                    <tr><td>loading...</td></tr>
                    }
                    
                </tbody>

            </table>

            {pages.length > 0 ?
                <>
                    pages: <span> </span>
                    {pages.map((e, i) =>
                        <span key={i}>

                            <a
                                style={{ fontWeight: page === (i + 1) ? "bold" : "" }}
                                href={"#/list/" + (i + 1)}
                                onClick={e => goPage(e, (i + 1))}>{i + 1}</a>

                            < span> </span>
                        </span>)}
                    {listEnd ?
                        <span>end</span>
                        :
                        <a href='#/list/' onClick={(e) => showMore(e)}>more</a>
                    }
                </>
                :
                <p></p>
            }
        </>
    )
}

export default withConnect(List);