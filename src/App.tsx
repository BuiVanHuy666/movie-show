import { Header } from "@/components/layouts/Header"
import {
    TrendingSection
} from "@/components/movies/TrendingSection.tsx";

function App() {
    return (
            <div className="min-h-screen bg-background text-foreground">
                <Header />
                <main className="container px-4 mx-auto mt-6">
                    <TrendingSection />
                </main>
            </div>
    )
}

export default App