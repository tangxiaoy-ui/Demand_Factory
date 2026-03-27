import { useState } from 'react'
import { ButtonGroup } from '@/components/common/ButtonGroup'
import { Card } from '@/components/common/Card'

export function ButtonGroupDemo() {
  const [message, setMessage] = useState('')

  const handleClick = (action: string) => {
    setMessage(`点击了: ${action}`)
    setTimeout(() => setMessage(''), 2000)
  }

  const oneButtonItem = [
    { id: '1', label: '新建需求', onClick: () => handleClick('新建需求') }
  ]

  const twoButtonItems = [
    { id: '1', label: '新建需求', onClick: () => handleClick('新建需求') },
    { id: '2', label: '导出数据', onClick: () => handleClick('导出数据') }
  ]

  const threeButtonItems = [
    { id: '1', label: '新建需求', onClick: () => handleClick('新建需求') },
    { id: '2', label: '导出数据', onClick: () => handleClick('导出数据') },
    { id: '3', label: '批量操作', onClick: () => handleClick('批量操作') }
  ]

  const fiveButtonItems = [
    { id: '1', label: '新建需求', onClick: () => handleClick('新建需求') },
    { id: '2', label: '导出数据', onClick: () => handleClick('导出数据') },
    { id: '3', label: '批量操作', onClick: () => handleClick('批量操作') },
    { id: '4', label: '导入数据', onClick: () => handleClick('导入数据') },
    { id: '5', label: '高级设置', onClick: () => handleClick('高级设置') }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">ButtonGroup 组件示例</h1>

        {message && (
          <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-md">
            {message}
          </div>
        )}

        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">单个按钮</h2>
            <div className="flex items-center justify-between">
              <div className="text-gray-600">显示1个按钮</div>
              <ButtonGroup items={oneButtonItem} />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">两个按钮</h2>
            <div className="flex items-center justify-between">
              <div className="text-gray-600">显示2个按钮</div>
              <ButtonGroup items={twoButtonItems} />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">三个按钮</h2>
            <div className="flex items-center justify-between">
              <div className="text-gray-600">显示3个按钮</div>
              <ButtonGroup items={threeButtonItems} />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">五个按钮 (显示"更多")</h2>
            <div className="flex items-center justify-between">
              <div className="text-gray-600">超过3个按钮时,第3个显示"更多"</div>
              <ButtonGroup items={fiveButtonItems} />
            </div>
            <p className="mt-4 text-sm text-gray-500">
              点击"更多"按钮后展开显示所有按钮
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">特性说明</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>按钮单行显示,不允许断行 (whitespace-nowrap)</li>
              <li>按钮宽度根据文字长度自适应</li>
              <li>按钮不显示图标</li>
              <li>超过3个按钮时,第3个显示"更多",点击后展开其他按钮</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
