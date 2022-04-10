import './FancyBorder.css'

export function FancyBorder({children}) {
    return (
        <div className="fancy-border">
            {children}
        </div>
    )
}