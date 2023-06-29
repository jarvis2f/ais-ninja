import { ProductInfo } from '@/types'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import {useTranslation} from 'react-i18next';

function GoodsList(props: { list: Array<ProductInfo>; onChange: (item: ProductInfo) => void }) {
  const [selectItem, setSelectItem] = useState<ProductInfo>()
  const { t } = useTranslation();

  useEffect(() => {
    if (selectItem && selectItem.id) {
      props.onChange?.(selectItem)
    }
  }, [selectItem])

  return (
    <div className={styles.goodsList}>
      {props.list.map((item) => {
        const className =
          selectItem?.id === item.id
            ? `${styles.goodsList_item} ${styles.goodsList_item_select}`
            : styles.goodsList_item
        return (
          <div
            key={item.id}
            className={className}
            onClick={() => {
              setSelectItem(item)
            }}
          >
			<p className={styles.goodsList_item_level}>{ item.level === 1 ? t('会员') : item.level === 2 ? t('超级会员') : t('超级特惠') }</p>
            {item.type === 'integral' ? <h3>{item.value}{t('积分')}</h3> : <h3>{item.value}{t('天')}</h3>}
			<div className={styles.goodsList_item_price}>
				<p className={styles.sales_price}>{(item.price / 100).toFixed(2)}<span>{t('元')}</span></p>
				{item.original_price && <p className={styles.original_price}>¥{(item.original_price / 100).toFixed(2)}</p>}
			</div>
            <span className={styles.goodsList_item_tag}>{item.badge}</span>
          </div>
        )
      })}
    </div>
  )
}

export default GoodsList
