import { auth } from "@/auth";


export async function proxy() {
    const sess = await auth();

    return null;
}