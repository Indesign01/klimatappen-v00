import GroupList from '@/components/groups/GroupList'

export default function KlimatgrupperPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Klimatgrupper</h1>
        <p className="text-gray-600">Anslut dig till lokala klimatgrupper och delta i diskussioner</p>
      </div>
      <GroupList />
    </div>
  )
}