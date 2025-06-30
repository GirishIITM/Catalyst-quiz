import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset } from "@/components/ui/sidebar"
import Header from "@/components/header"
import { Bookmark, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockNotes = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    subject: "ML",
    fileUrl: "/notes/ml-intro.pdf",
  },
  {
    id: 2,
    title: "Database Indexing",
    subject: "DBMS",
    fileUrl: "/notes/dbms-indexing.pdf",
  },
  {
    id: 3,
    title: "Semantic Search in AI",
    subject: "AI",
    fileUrl: "/notes/ai-semantic-search.pdf",
  },
]

export default function StudentViewNotes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("All")
  const [bookmarked, setBookmarked] = useState<number[]>([])

 const filteredNotes = mockNotes.filter((note) => {
  const matchSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase())

  const matchFilter =
    filter === "All"
      ? true
      : filter === "Bookmarked"
        ? bookmarked.includes(note.id)
        : note.subject === filter

  return matchSearch && matchFilter
})


  const toggleBookmark = (id: number) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    )
  }

  return (
    <SidebarInset>
      <Header title="Class Notes" />
      <div className="flex flex-col gap-6 p-4 pt-0 mt-20">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2"
          />
          <Select onValueChange={(val) => setFilter(val)} defaultValue="All">
            <SelectTrigger className="md:w-48 w-full">
              <SelectValue placeholder="Filter by Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="AI">AI</SelectItem>
              <SelectItem value="ML">ML</SelectItem>
              <SelectItem value="DBMS">DBMS</SelectItem>
              <SelectItem value="Bookmarked">Bookmarked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notes Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="flex flex-col justify-between h-full">
              <CardHeader>
                <CardTitle className="text-base">{note.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{note.subject}</p>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleBookmark(note.id)}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${
                        bookmarked.includes(note.id) ? "fill-primary text-primary" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(note.fileUrl, "_blank")}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="text-center text-muted-foreground mt-10">
            No notes found.
          </div>
        )}
      </div>
    </SidebarInset>
  )
}
