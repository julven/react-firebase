import { connect } from "react-redux"
import { compose } from "redux"
import { mapReduxAccountDispatchToProps, mapReduxAccountStateToProps, reduxAccountContext } from "./ReduxAccount";
import { mapReduxListDispatchToProps, mapReduxListStateToProps, reduxListContext } from "./ReduxList";

const withConnect = Component => {


    Component = compose(
        connect(mapReduxAccountStateToProps, mapReduxAccountDispatchToProps, null, {context: reduxAccountContext}),
        connect(mapReduxListStateToProps, mapReduxListDispatchToProps, null, {context: reduxListContext}),
    )  (Component)

    return Component;
}

export default withConnect;