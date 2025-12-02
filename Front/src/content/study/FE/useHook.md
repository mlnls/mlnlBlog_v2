---

## 왜 이 주제를 선택하게 되었는지

```jsx
// 편의상 queryKey, API 함수 import 부분은 생략

  const { data, isLoading, isError } =
    useQuery<ComGeneralMailResultListResponse>({
      queryFn: () =>
        getGeneralMailResultList({
          pageSize: DEFAULT_PAGE,
          currentPage: page,
          commitCode,
        }),
    });

  if (isLoading) return <Loading />;
  if (isError) return <></>;
```

현재 다른 프로젝트에서 사용하고 있는 실제 코드입니다.

현재 데이터를 loading 중인지, error가 있는지 파악하고

그에 따른 분기처리를 위 코드와 같이 진행했습니다.

하지만 그에 따라 코드가 길어지고, 응집도가 떨어져 보였고 나중에 되어서는 가독성이 무척 떨어지는 코드에

일조하는 패턴이라고 생각합니다.

( isLoading, isError 호출 부분과 실제 사용 부분이 멀리 떨어질 수 밖에 없는 구조 발생 )

`⇒ 코드 응집도 저하`

하여 해당 비동기 처리를 좀 더 간결하고 응집도 있게 처리할 수 있는 방법을 찾았고

React v19 에 새로 나온 훅, `use` 를 이번 스터디 주제로 선정하였습니다.

---

## Use에 대한 소개

- 하단의 공식 문서와 영상을 참고하여 작성합니다.
  https://ko.react.dev/reference/react/use
  https://www.youtube.com/watch?v=Hd1JeePasuw&t=350s

### Use란?

<aside>
💡

`use`는 [Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)나 [Context](https://ko.react.dev/learn/passing-data-deeply-with-context)와 같은 데이터를 참조하는 React API입니다.

</aside>

```jsx
// 공식 문서 코드
const value = use(resource);
```

한 마디로, 비동기 값을 동기처럼 읽고 쓸 수 있게 해주는 역할입니다.

```jsx
const promise = fetch("/api/res");
const data = use(promise);
```

물론 비동기 값을 실제로 동기처럼 처리하는 것은 아닙니다.

`“/api/res"` 에서 받아온 데이터를 처리할 때까지 랜더링을 일시 중지 시킨 뒤에 ( Suspend )

Promise가 fulfilled / rejected 되고 나서 진행하는 것은 동일합니다.

하지만 위에서 언급했던 대로 동기처럼 사용이 가능합니다.

실제로 다른 hook 들은 사용하지 못하는 곳에서 사용이 가능합니다.

<aside>
💡

- 다른 `hook`이 사용되지 못하는 곳

1. 조건문, 반복문 안
2. `return` 문 다음
3. 이벤트 핸들러
4. 클래스 컴포넌트
</aside>

<aside>
💡

- use Hook은 사용할 수 있다

1. 조건문, 반복문 안
2. `return` 문 다음
</aside>

이 특징과 장점들을 가지고 실제 코드에 적용시켜 보겠습니다.

### 적용

- 코드 응집도

  ```jsx
  function userInventory ({ userId, search }) {
  	const { inventory } = useUserInfo(search);
  	const normalItems = fetchNormalItems();
  	const eventItems = fetchEventItems();

  	return inventory.filter((...) => {
  		if (!search) return true;
  		if ( 노말아이템인지? ) normalItems 데이터를 가지고 이름 체크;
  		if ( 이벤트아이템인지? ) eventItems 데이터를 가지고 이름 체크;

  		return false;
  	})
  }
  ```

  userId를 가지고 inventory 를 불러왔습니다.
  가져온 인벤토리 아이디 안에는 아이템의 이름이 아닌 아이템의 pk인 id가 들어있습니다.
  하여, normalItems 인지 eventItem인지 파악 후에 해당 id로 이름을 가져와야 하는 경우입니다.
  해당 로직에는 두 가지의 문제점이 있습니다.

  1. search가 없는 경우에는 불필요한 blocking 이 생긴다.

     ```jsx
     const normalItems = useNormalItems();
     const eventItems = useEventItems();
     ```

     이 부분은 굳이 호출하지 않아도 되는 부분이기에 소비자의 UX 만 하락시키게 됩니다.

  1. normalItems / eventItems의 호출 부분과 사용 부분이 멀어진다.

     `use` 를 제외한 다른 훅들은 조건문 안에서 사용이 불가합니다.

     하여 상단의 코드와 같이 나눠둘 수 밖에 없고 이는 곧 응집도의 저하로 이어집니다.

  ```jsx
  function userInventory ({ userId, search }) {
  	const { inventory } = useUserInfo(search);

  	return inventory.filter((...) => {
  		if (!search) return true;
  		if ( 노말아이템인지? ) use(fetchNormalItems());
  		if ( 이벤트아이템인지? ) use(fetchEventItems());

  		return false;
  	})
  }
  ```

  하여 위 코드와 같이 `use` 훅을 사용해 수정해준다면,
  위에서 언급했던 두 가지의 문제점이 모두 해결됩니다.

- ErrorBoundary / Suspense 활용
  `use` 가 Pending 상태에는 가장 가까운 Suspense를 호출합니다.

  ```jsx
  "use client";

  import { use, Suspense } from "react";
  import { ErrorBoundary } from "react-error-boundary";

  export function MessageContainer({ messagePromise }) {
    return (
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <Suspense fallback={<p>⌛Downloading message...</p>}>
          <Message messagePromise={messagePromise} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  function Message({ messagePromise }) {
    const content = use(messagePromise);
    return <p>Here is the message: {content}</p>;
  }
  ```

  하여 위 코드처럼 Error Boundary 나 Suspense를
  꼭 해당 컴포넌트 내부에서 처리할 필요 없이 상위 컴포넌트에서 관리가 가능합니다.

  ```jsx
  // 편의상 queryKey, API 함수 import 부분은 생략

  const { data, isLoading, isError } =
    useQuery <
    ComGeneralMailResultListResponse >
    {
      queryFn: () =>
        getGeneralMailResultList({
          pageSize: DEFAULT_PAGE,
          currentPage: page,
          commitCode,
        }),
    };

  //  if (isLoading) return <Loading />;
  //  if (isError) return <></>;
  ```

  query 훅을 사용할 땐 꼭 들어가던 isLoading / isError 에 따른 return을 빼고
  좀 더 가독성 있는 코드가 가능해질 것으로 보입니다.

---

## 문제점

<aside>
💡

`use` 훅은 결국 Low-level API 이기에, 꼭 이 훅을 사용하는 것이 무조건 좋다는 아닙니다.

</aside>

### Request Waterfall

```jsx
function userInventory ({ userId, search }) {
	const { inventory } = useUserInfo(search);

	return inventory.filter((...) => {
		if (!search) return true;
		if ( 노말아이템인지? ) use(fetchNormalItems());
		if ( 이벤트아이템인지? ) use(fetchEventItems());

		return false;
	})
}
```

위와 같이 use를 사용해서 코드를 작성하면,

fetchNormalItems / fetchEventItems 라는 함수가 동시에 시작하는 것이 아닙니다.

![한 fetch가 끝나야 다음 fetch가 진행된다.](attachment:abf87e06-7c45-4cb8-81a6-3ba9fe2ae96d:image.png)

한 fetch가 끝나야 다음 fetch가 진행된다.

if 문에 처음으로 들어가고 use 가 실행되면 Suspense 상태이기 때문에,

다음 if 문 안에 fetch는 시작되지 않습니다.

이에 따라 pre-fetch 와 같이 request를 미리 한 번에 해두는 방식으로 해결합니다

⇒ 코드의 응집도를 다시 떨어트릴 수 있으니 일종의 관심사 분리가 필요할 가능성 있음
