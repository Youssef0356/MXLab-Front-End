import Layout from "../../../Components/Common/Layout";
const UserView: React.FC = () => {
    return (
        <Layout>
            <div className="p-6 space-y-6">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Voir les utilisateurs</h1>
                <p className="text-slate-600">Consultez et gérez les informations des utilisateurs du système.</p>
            </div>
        </Layout>
    );
};
export default UserView;