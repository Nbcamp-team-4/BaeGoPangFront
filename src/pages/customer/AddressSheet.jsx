import { useState } from 'react';

import { Phone, TopBar, Btn, Badge } from '../../shared/components';
import { G, PRIMARY, PRIMARY_LIGHT } from '../../shared/constants';
import { Icon } from '../../shared/icons';

// ── 주소 목록 페이지 ──────────────────────────────────────
function AddressListPage({ addrs, onSelect, onDelete, onGoAdd, onConfirm, onBack }) {
  const selected = addrs.find((a) => a.selected);

  return (
    <Phone noNav>
      <TopBar title="배달 주소" backTo={onBack} />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
        {addrs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: G[400], fontSize: '13px' }}>
            저장된 주소가 없습니다
          </div>
        )}

        {addrs.map((a) => (
          <div
            key={a.id}
            onClick={() => onSelect(a.id)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '14px',
              border: `1.5px solid ${a.selected ? PRIMARY : G[200]}`,
              borderRadius: '13px',
              background: a.selected ? PRIMARY_LIGHT : '#fff',
              cursor: 'pointer',
              transition: 'all .15s'
            }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: `2px solid ${a.selected ? PRIMARY : G[300]}`,
                background: a.selected ? PRIMARY : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px'
              }}>
              {a.selected && <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#fff' }} />}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: a.selected ? PRIMARY : G[900] }}>
                  {a.label}
                </span>
                {a.selected && (
                  <Badge bg={PRIMARY} color="#fff">
                    선택됨
                  </Badge>
                )}
              </div>
              <div style={{ fontSize: '13px', color: G[700], lineHeight: '1.6' }}>{a.road}</div>
              {a.detail && <div style={{ fontSize: '12px', color: G[400], marginTop: '2px' }}>{a.detail}</div>}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(a.id);
              }}
              style={{
                padding: '4px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
                marginTop: '2px'
              }}>
              {Icon.trash()}
            </button>
          </div>
        ))}

        <div
          onClick={onGoAdd}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px',
            border: `2px dashed ${G[300]}`,
            borderRadius: '13px',
            cursor: 'pointer',
            color: G[500]
          }}>
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: G[200],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
            <span style={{ fontSize: '14px', lineHeight: 1, color: G[500], marginTop: '-1px' }}>+</span>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, flex: 1 }}>새 주소 추가</span>
          {Icon.chevron()}
        </div>
      </div>

      <div style={{ padding: '12px 16px 32px', flexShrink: 0, borderTop: `1px solid ${G[100]}` }}>
        {/* selected가 없으면 비활성화 */}
        <Btn variant="primary" full size="lg" disabled={!selected} onClick={() => onConfirm(selected)}>
          이 주소로 배달받기
        </Btn>
      </div>
    </Phone>
  );
}

// ── 주소 추가 페이지 ──────────────────────────────────────
function AddAddressFormPage({ onBack, onAdd }) {
  const [form, setForm] = useState({ label: '', road: '', detail: '' });

  const handleAdd = () => {
    if (!form.road.trim()) return;
    onAdd({ ...form, label: form.label.trim() || '기타' });
  };

  return (
    <Phone noNav>
      <TopBar title="새 주소 추가" backTo={onBack} />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
        {[
          { label: '별명', key: 'label', ph: '집, 회사, 기타…', required: false },
          { label: '도로명 주소', key: 'road', ph: '서울 종로구 세종대로 172', required: true },
          { label: '상세 주소', key: 'detail', ph: '동·호수·층', required: false }
        ].map(({ label, key, ph, required }) => (
          <div key={key}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: G[600], marginBottom: '7px' }}>
              {label}
              {required && <span style={{ color: PRIMARY }}> *</span>}
            </div>
            <input
              value={form[key]}
              onChange={(e) => setForm((d) => ({ ...d, [key]: e.target.value }))}
              placeholder={ph}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: `1.5px solid ${G[300]}`,
                borderRadius: '11px',
                fontSize: '13px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                outline: 'none',
                color: G[900],
                background: G[50]
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ padding: '12px 18px 32px', flexShrink: 0 }}>
        <Btn variant="primary" full size="lg" disabled={!form.road.trim()} onClick={handleAdd}>
          주소 추가하기
        </Btn>
      </div>
    </Phone>
  );
}

// ── 진입점 ────────────────────────────────────────────────
export default function AddressPage({ onBack, onConfirm }) {
  const [page, setPage] = useState('list');
  const [addrs, setAddrs] = useState([
    { id: 1, label: '집', road: '서울 종로구 세종대로 172', detail: '101호', selected: true },
    { id: 2, label: '회사', road: '서울 중구 을지로 30', detail: '5층', selected: false }
  ]);

  const select = (id) => setAddrs((a) => a.map((x) => ({ ...x, selected: x.id === id })));
  const remove = (id) => setAddrs((a) => a.filter((x) => x.id !== id));

  const handleAdd = (newAddr) => {
    const id = Date.now();
    setAddrs((a) => [...a.map((x) => ({ ...x, selected: false })), { id, ...newAddr, selected: true }]);
    setPage('list');
  };

  if (page === 'add') {
    return <AddAddressFormPage onBack={() => setPage('list')} onAdd={handleAdd} />;
  }

  return (
    <AddressListPage
      addrs={addrs}
      onSelect={select}
      onDelete={remove}
      onGoAdd={() => setPage('add')}
      onConfirm={onConfirm} // (selectedAddr) => void — 주소 객체 전달
      onBack={onBack}
    />
  );
}
