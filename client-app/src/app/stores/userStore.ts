import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValue } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore
{
    user: User | null = null;

    constructor()
    {
        makeAutoObservable(this)
    }

    get isLoggedIn()
    {
        return !!this.user;
    }

    login = async (creds: UserFormValue) =>
    {
        try
        {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/activities');
            store.modalStore.closeModal();
        } catch (error)
        {
            throw error;
        }

    }

    register = async (creds: UserFormValue) =>
    {
        try {
            const user = await agent.Account.register(creds);
        store.commonStore.setToken(user.token);
        runInAction(() => this.user = user);
        router.navigate('/activities');
        store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () =>
    {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }

    getUser = async () =>
    {
        try
        {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error)
        {
            console.log(error);
        }
    }
}