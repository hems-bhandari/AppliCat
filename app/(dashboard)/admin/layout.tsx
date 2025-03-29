import { ReactNode } from "react"

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="pt-10 px-5">
            {children}
        </div>
    )
}

export default AdminLayout;
