#include <bits/stdc++.h>

using namespace std;

void sortMerger(int arr[],int low,int mid,int high)
{
        int i,j,k,temp[high-low+1];

        i=low;
        k=0;
        j=mid+1;

        while(i<=mid && j<=high)
        {
                if(arr[i]<arr[j])
                        temp[k++]=arr[i++];
                else
                        temp[k++]=arr[j++];
        }

        while(i<=mid)
                temp[k++]=arr[i++];
        while(j<=high)
                temp[k++]=arr[j++];

        for(i=low; i<=high;i++)
                arr[i]=temp[i-low];

}

void mergesort(int arr[],int l,int r)
{
//        if(l<r)
  //      {
    //            int m = (l+r)/2;
      //          mergesort(arr,l,m);
        //        mergesort(arr,m+1,r);
      //          sortMerger(arr,l,m,r);
        //}
}

int main()
{
        int arr[]={1,2,4,6,2,3,4,5};
        int tosort[]={2,3,5,9,2,5,7,0,8,12,14,15,16,9,4,2,1};
//        sortMerger(arr,0,sizeof(arr)/8,sizeof(arr)/4-1);
        mergesort(tosort,0,sizeof(tosort)/4-1);
        for(int i=0;i<sizeof(tosort)/4;i++)
                cout<<tosort[i]<<" ";
        return 0;
}
