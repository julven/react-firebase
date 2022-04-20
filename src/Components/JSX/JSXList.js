import React from "react";
import { useNavigate } from "react-router-dom";

const JSXList = ({ parent }) => {


    const navigate = useNavigate()
    let {
        searchRef,
        setSearch,
        search,
        searchHandler,
        pages,
        page,
        goPage,
        listEnd,
        showMore,
        TableRow,
        deleteHandler,
        loading,
        list,
        param

    } = parent



    return (
        <>
            <div className='row justify-content-center'>

                <div className='col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6'>
                    <div className="card">
                        <div className="card-body">
                            <p className='fs-1'>List</p>
                            <div className="input-group mb-0">
                                <input
                                    ref={searchRef}
                                    onChange={e => setSearch(e.target.value)}
                                    type="text"
                                    value={search}
                                    className="form-control"
                                    placeholder="by first name..."
                                    aria-describedby="button-addon2" />
                                <button
                                    onClick={searchHandler}
                                    className="btn btn-outline-primary" type="button" id="button-addon2">Search</button>
                                <button
                                    onClick={() => navigate("/listadd")}
                                    className="btn btn-primary" type="button">Add</button>
                            </div>
                            {"search" in param && <small className="text-secondary">empty the field then search to reset</small>}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th >No.</th>
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
                                            <tr><td colSpan={4} className="text-center">no results</td></tr>
                                            :
                                            <tr><td colSpan={4} className="text-center">loading...</td></tr>
                                    }
                                </tbody>
                            </table>
                            {pages.length > 0 ?
                                <>
                                    <ul className="pagination pagination-sm" onClick={e => e.preventDefault()}>
                                        <li className="page-item disabled">
                                            <span className="page-link">Pages</span>
                                        </li>
                                        {pages.map((e, i) =>
                                            <li className={"page-item " + (page === (i + 1) ? "active" : "")} key={i}>
                                                <a
                                                    onClick={e => goPage(e, (i + 1))}
                                                    className="page-link" href="#">{i + 1}</a>
                                            </li>
                                        )

                                        }
                                        {listEnd ?
                                            <li className="page-item disabled">
                                                <a className="page-link" href="#">End</a>
                                            </li>
                                            :
                                            <li className="page-item">
                                                <a
                                                    onClick={(e) => showMore(e)}
                                                    className="page-link" href="#">More</a>
                                            </li>
                                        }
                                    </ul>
                                </>
                                :
                                <>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JSXList