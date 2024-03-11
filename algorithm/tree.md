# 트리

```java

/*

1. 각 노드의 부모노드 구하기
par[i] = i의 부모 노드

2. 각 노드의 깊이 구하기
depth[i] = i의 깊이

3. 각 노드의 서브트리 크기 구하기
sz[i] = i가 루트인 서브트리의 크기

*/

void dfs(int cur, int prv){
  int i;
  
  sz[cur] = 1;
  for(i = 0; i < v[cur].size(); i++){
    if(v[cur][i] == prv) continue;
    
    par[v[cur][i]] = cur;   //위치 무관
    depth[v[cur][i]] = depth[cur] + 1;  //dfs보다 위, 루트부터의 어떤 정보를 저장한다면 dfs보다 위.
    
    dfs(v[cur][i], cur);
    
    sz[cur] += sz[v[cur][i]];  //dfs보다 아래, 서브트리의 정보는 dfs보다 아래에 있어야 한다.
  }
}

```