
function GetOutputText(props) {
    const t = props.text
    const [backendData, setBackendData] = useState([]);

    useEffect(() => {
        fetch("/api/reverse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: t })
        }).then(
            response => response.json()
        ).then(
            data => { setBackendData(data.output); }
        );
    }, []);
    return <body>Your message reversed: {backendData}</body>;
}

function WorkingApp() {
    const [backendData, setBackendData] = useState([]);

    useEffect(() => {
        fetch("/api/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: 'foo' })
        }).then(
            response => response.json()
        ).then(
            data => { setBackendData(data.output); }
        );
    }, []);
    return <div className="App">
        <p>the request was {backendData}</p>
    </div>;
}

function WorkingApp2() {
    return <div className="App">
        <GetOutputText text={"yo"} />
    </div>;
}