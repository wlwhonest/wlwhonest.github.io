---
title: atcoder(ABC)-388
date: 2025-01-12 00:05:48
tags: algorithm contest
mathjax: true
excerpt: "普及组的难度，需要会做到E"
thumbnail: https://img.atcoder.jp/abc388/26686710916fe3623058f6000669e049.png
cover: https://img.atcoder.jp/abc388/26686710916fe3623058f6000669e049.png
---








|                                                        | Task Name                                                    | Time Limit | Memory Limit |                                                              |
| :----------------------------------------------------: | :----------------------------------------------------------- | ---------: | -----------: | :----------------------------------------------------------- |
| [A](https://atcoder.jp/contests/abc388/tasks/abc388_a) | [?UPC](https://atcoder.jp/contests/abc388/tasks/abc388_a)    |      2 sec |      1024 MB | [Submit](https://atcoder.jp/contests/abc388/submit?taskScreenName=abc388_a) |
| [B](https://atcoder.jp/contests/abc388/tasks/abc388_b) | [Heavy Snake](https://atcoder.jp/contests/abc388/tasks/abc388_b) |      2 sec |      1024 MB | [Submit](https://atcoder.jp/contests/abc388/submit?taskScreenName=abc388_b) |
| [C](https://atcoder.jp/contests/abc388/tasks/abc388_c) | [Various Kagamimochi](https://atcoder.jp/contests/abc388/tasks/abc388_c) |      2 sec |      1024 MB | [Submit](https://atcoder.jp/contests/abc388/submit?taskScreenName=abc388_c) |
| [D](https://atcoder.jp/contests/abc388/tasks/abc388_d) | [Coming of Age Celebration](https://atcoder.jp/contests/abc388/tasks/abc388_d) |      2 sec |      1024 MB | [Submit](https://atcoder.jp/contests/abc388/submit?taskScreenName=abc388_d) |
| [E](https://atcoder.jp/contests/abc388/tasks/abc388_e) | [Simultaneous Kagamimochi](https://atcoder.jp/contests/abc388/tasks/abc388_e) |      2 sec |      1024 MB | [Submit](https://atcoder.jp/contests/abc388/submit?taskScreenName=abc388_e) |
| [F](https://atcoder.jp/contests/abc388/tasks/abc388_f) | [Dangerous Sugoroku](https://atcoder.jp/contests/abc388/tasks/abc388_f) |      4 sec |      1024 MB | [Submit](https://atcoder.jp/contests/abc388/submit?taskScreenName=abc388_f) |
| [G](https://atcoder.jp/contests/abc388/tasks/abc388_g) | [Simultaneous Kagamimochi 2](https://atcoder.jp/contests/abc388/tasks/abc388_g) |      2 sec |      1024 MB | [Submit](https://atcoder.jp/contests/abc388/submit?taskScreenName=abc388_g) |


## D-[Coming of Age Celebration](https://atcoder.jp/contests/abc388/tasks/abc388_d)

### Problem Statement

On a certain planet, there are $N$ aliens, all of whom are minors.

The $i$\-th alien currently has $A_i$ stones, and will become an adult exactly $i$ years later.

When someone becomes an adult on this planet, every **adult** who has at least one stone gives exactly one stone as a congratulatory gift to the alien who has just become an adult.

Find how many stones each alien will have after $N$ years.

Assume that no new aliens will be born in the future.

### Constraints

-   $1 \leq N \leq 5 \times 10^5$
-   $0 \leq A_i \leq 5 \times 10^5$
-   All input values are integers.

### Input

The input is given from Standard Input in the following format:

$N$
$A_1$ $A_2$ $\ldots$ $A_N$

### Output

Let $B_i$ be the number of stones owned by the $i$\-th alien after $N$ years. Print $B_1, B_2, \ldots, B_N$ in this order, separated by spaces.

### Sample Input 1

```
4
5 0 9 3
```

### Sample Output 1

```
2 0 10 5
```

Let $C_i$ be the number of stones that the $i$\-th alien has at a given time.

Initially, $(C_1, C_2, C_3, C_4) = (5, 0, 9, 3)$.

After $1$ year, $(C_1, C_2, C_3, C_4) = (5, 0, 9, 3)$.

After $2$ years, $(C_1, C_2, C_3, C_4) = (4, 1, 9, 3)$.

After $3$ years, $(C_1, C_2, C_3, C_4) = (3, 0, 11, 3)$.

After $4$ years, $(C_1, C_2, C_3, C_4) = (2, 0, 10, 5)$.



### gpt-o的解

```c
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(0);
    
    int N;
    cin >> N;
    vector<ll> A(N);
    for(int i=0;i<N;i++) cin>>A[i];
    
    // 初始化差分数组
    vector<ll> diff(N+2, 0);
    // 初始化最终石头数量数组
    vector<ll> B(N, 0);
    // 当前收到的石头数量
    ll current_R =0;
    
    for(int j=1; j<=N; j++){
        current_R += diff[j];
        ll Rj = current_R;
        // 计算 G_j
        ll Gj = min(A[j-1] + Rj, (ll)(N - j));
        // 计算 B_j
        B[j-1] = A[j-1] - Gj + Rj;
        // 如果 G_j >0，标记赠送范围
        if(Gj >0){
            int L = j +1;
            int R_ = j + Gj;
            if(L <=N){
                diff[L] +=1;
            }
            if(R_ +1 <=N){
                diff[R_ +1] -=1;
            }
        }
    }
    
    // 输出结果
    for(int i=0;i<N;i++){
        if(i>0) cout<<' ';
        cout<<B[i];
    }
    cout<<'\n';
}

```

> 成年有两个操作，得到礼物，以及送出礼物

### 正解——差分

```c
#include<bits/stdc++.h>

using namespace std;

signed main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    
    int n;
    cin>>n;

    vector<int> a(n+1), d(n+1,0);

    for(int i=1;i<=n;i++) cin>>a[i];

    int cur=0;
    for(int i=1;i<=n;i++){
        cur+=d[i];
        a[i]+=cur;

        int t=min(a[i],n-i);
        a[i]-= t;
        d[i+1]+=1;
        d[i+t+1]-=1;

        cout<<a[i]<<' ';
    }

    return 0;
}
```

### 



## E-[Simultaneous Kagamimochi](https://atcoder.jp/contests/abc388/tasks/abc388_e)

### Problem Statement

There are $N$ mochi (rice cakes), arranged in ascending order of size. The size of the $i$\-th mochi $(1\leq i\leq N)$ is $A_i$.

Given two mochi $A$ and $B$, with sizes $a$ and $b$ respectively, you can make one kagamimochi (a stacked rice cake) by placing mochi $A$ on top of mochi $B$ if and only if $a$ is at most half of $b$.

Find how many kagamimochi can be made simultaneously.

More precisely, find the maximum non-negative integer $K$ for which the following is possible:

-   From the $N$ mochi, choose $2K$ of them to form $K$ pairs. For each pair, place one mochi on top of the other, to make $K$ kagamimochi.

### Constraints

-   $2 \leq N \leq 5 \times 10^5$
-   $1 \leq A_i \leq 10^9 \ (1 \leq i \leq N)$
-   $A_i \leq A_{i+1} \ (1 \leq i \lt N)$
-   All input values are integers.



### Input

The input is given from Standard Input in the following format:

$N$
$A_1$ $A_2$ $\dotsc$ $A_N$

### Output

Print the maximum $K$ such that $K$ kagamimochi can be made simultaneously.

### Sample Input 1

```
6
2 3 4 4 7 10
```

### Sample Output 1

```
3
```

The sizes of the given mochi are as follows:

![](https://img.atcoder.jp/abc388/29024766d11c2d88b06c92b2081129f5.png)

In this case, you can make the following three kagamimochi simultaneously:

![](https://img.atcoder.jp/abc388/26686710916fe3623058f6000669e049.png)

It is not possible to make four or more kagamimochi from six mochi, so print `3`.





### 误解1

```c
#include<bits/stdc++.h>

using namespace std;
#define int long long 

signed main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	
	int n;
	cin>>n;

	vector<int> a(n);

	for(int i=0;i<n;i++) cin>>a[i];

	int i=0,j=0;
	int cnt=0;
	
	while(i<n&&j<n){
		if(a[i]*2<=a[j]){
			cnt++;
			i++;
			j++;
		}else{
			j++;
		}
	}

	cout<<cnt<<endl;

	return 0;
}
```

### 误解2

```c
#include<bits/stdc++.h>

using namespace std;
#define int long long 

signed main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	
	int n;
	cin>>n;

	vector<int> a(n),v(n);

	for(int i=0;i<n;i++) cin>>a[i];

	int i=0,j=0;
	int cnt=0;
	
	while(i<n&&j<n){
		if(v[i]){
			i++;
		}else{
			if(a[i]*2<=a[j]){
				v[i]++;
				v[j]++;
				cnt++;
				i++;
				j++;
			}else{
				j++;
			}
		}
	}

	cout<<cnt<<endl;

	return 0;
}
```

> 试想，一个输入能得到的最优解是总数的一半，如果两个指针都从头开始，那么小的如果和小的配成一对，就会影响后面大的和小的配对，导致大的没有配对，从而是统计配对数目减少

### 正解——双指针

```c
#include<bits/stdc++.h>

using namespace std;
#define int long long 

signed main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	
	int n;
	cin>>n;

	vector<int> a(n);

	for(int i=0;i<n;i++) cin>>a[i];

	int i=0,j=n/2;
	int cnt=0;
	
	while(i<n&&j<n){
		if(a[i]*2<=a[j]){
			cnt++;
			i++;
			j++;
		}else{
			j++;
		}
	}

	cout<<cnt<<endl;

	return 0;
}
```

