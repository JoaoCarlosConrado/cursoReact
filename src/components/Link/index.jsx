import "./styles.css"

function Link({children, href, target}) {
    return (
        <a className="link-container" href={href} target={target}>{children}</a>
    );
}

export default Link;