----

```typescript
    try {
        
    } catch (e) {        
        console.log('Error while retrieving items', e)
    }
```


```typescript
let items: WidgetItem[] = []
```


```typescript
import {fetchItems} from '../../../src/utils/fetch/items'
```


```typescript
const response = await fetchItems(nextCookies, boardId)
```


```typescript
        if (Array.isArray(response)) {
            items = response.map( (json: string) => JSON.parse(json) )
        }
```

----

```typescript
!!items.length && items.map(item => )
```


```typescript
<li key={item.id}>
```

```typescript
<p>{item.id}</p>
```


```typescript
<p>Type: {item.type}</p>
```


```typescript
 <p>{item.data.content || item.data.title}</p>
```


----

```typescript
    async function createItemOnBoard(data: FormData) {}
```


```typescript
'use server'
```


```typescript
let content: string = data.get('content') as string;
```


```typescript
await createItem(cookies(), boardId, content)
```


```typescript
revalidatePath(`/boards/${boardId}`)
```

----

```typescript
    let [, startTransition] = useTransition()
```


```typescript
import {deleteItemFromBoard} from "../../app/actions";
```


```typescript
 <ItemView boardId={boardId} itemJson={JSON.stringify(item)}/>
```

